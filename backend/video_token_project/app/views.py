import secrets
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from .models import Video, Token, AnalyticsEvent, AdminUser
from .serializers import VideoSerializer, TokenSerializer


class VideoListCreateView(generics.ListCreateAPIView):
    queryset = Video.objects.all().order_by('-created_at')
    serializer_class = VideoSerializer


class VideoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]


class TokenListCreateView(generics.ListCreateAPIView):
    queryset = Token.objects.all().order_by('-created_at')
    serializer_class = TokenSerializer

    def perform_create(self, serializer):
        serializer.save(status=Token.Status.NEW)


class ActivateView(APIView):
    """POST { "token": "uuid" } -> активирует токен, возвращает список видео."""

    def post(self, request: Request):
        token_value = request.data.get('token') or request.data.get('value') or ''
        token_value = str(token_value).strip()
        if not token_value:
            return Response(
                {'error': 'Токен не указан'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            token = Token.objects.get(value=token_value)
        except Token.DoesNotExist:
            return Response(
                {'error': 'Токен не найден или неверный'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if token.status != Token.Status.ACTIVATED:
            token.status = Token.Status.ACTIVATED
            token.activated_at = timezone.now()
            token.save(update_fields=['status', 'activated_at'])

        if token.video_id:
            videos = Video.objects.filter(id=token.video_id)
        else:
            videos = Video.objects.all().order_by('-created_at')

        serializer = VideoSerializer(videos, many=True, context={'request': request})
        return Response({
            'success': True,
            'videos': serializer.data,
        })


class AnalyticsSummaryView(APIView):
    """GET — сводка для аналитики. Заголовок Authorization: Bearer <admin_token> опционален (для админки)."""

    def get(self, request: Request):
        from django.db.models import Count
        videos_count = Video.objects.count()
        tokens_count = Token.objects.count()
        tokens_new = Token.objects.filter(status=Token.Status.NEW).count()
        tokens_activated = Token.objects.filter(status=Token.Status.ACTIVATED).count()
        views_count = AnalyticsEvent.objects.filter(type='video_view').count()
        return Response({
            'videos_count': videos_count,
            'tokens_count': tokens_count,
            'tokens_new': tokens_new,
            'tokens_activated': tokens_activated,
            'views_count': views_count,
        })


class RecordViewView(APIView):
    """POST { "video_id": 1 } — записать просмотр видео."""

    def post(self, request: Request):
        video_id = request.data.get('video_id')
        if video_id is None:
            return Response({'error': 'video_id обязателен'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            video = Video.objects.get(pk=video_id)
        except Video.DoesNotExist:
            return Response({'error': 'Видео не найдено'}, status=status.HTTP_404_NOT_FOUND)
        AnalyticsEvent.objects.create(type='video_view', payload={'video_id': video.id})
        return Response({'success': True})


def _get_or_create_admin():
    admin, _ = AdminUser.objects.get_or_create(
        username='1',
        defaults={'password_hash': make_password('1')},
    )
    return admin


def _admin_from_token(request: Request):
    """Возвращает AdminUser по заголовку Authorization: Bearer <token> или None."""
    auth = request.META.get('HTTP_AUTHORIZATION') or ''
    if not auth.startswith('Bearer '):
        return None
    token = auth[7:].strip()
    if not token:
        return None
    now = timezone.now()
    try:
        admin = AdminUser.objects.get(auth_token=token)
        if admin.auth_token_expires_at and admin.auth_token_expires_at < now:
            return None
        return admin
    except AdminUser.DoesNotExist:
        return None


@method_decorator(csrf_exempt, name='dispatch')
class AdminLoginView(APIView):
    """POST { "username": "1", "password": "1" } — вход в админку. Возвращает { success, token }."""
    parser_classes = [JSONParser]

    def post(self, request: Request):
        _get_or_create_admin()
        data = getattr(request, 'data', None) or {}
        if not isinstance(data, dict):
            data = {}
        username = (data.get('username') or '').strip()
        password = data.get('password') or ''
        try:
            admin = AdminUser.objects.get(username=username)
        except AdminUser.DoesNotExist:
            return Response({'error': 'Неверный логин или пароль'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_password(password, admin.password_hash):
            return Response({'error': 'Неверный логин или пароль'}, status=status.HTTP_400_BAD_REQUEST)
        admin.auth_token = secrets.token_urlsafe(48)
        admin.auth_token_expires_at = timezone.now() + timezone.timedelta(days=7)
        admin.save(update_fields=['auth_token', 'auth_token_expires_at'])
        return Response({'success': True, 'token': admin.auth_token})


@method_decorator(csrf_exempt, name='dispatch')
class AdminChangePasswordView(APIView):
    """POST { "current_password": "...", "new_password": "..." } + заголовок Authorization: Bearer <token>."""

    def post(self, request: Request):
        admin = _admin_from_token(request)
        if not admin:
            return Response({'error': 'Войдите в админку'}, status=status.HTTP_401_UNAUTHORIZED)
        current = request.data.get('current_password') or ''
        new_pass = request.data.get('new_password') or ''
        if not check_password(current, admin.password_hash):
            return Response({'error': 'Неверный текущий пароль'}, status=status.HTTP_400_BAD_REQUEST)
        if len(new_pass) < 1:
            return Response({'error': 'Введите новый пароль'}, status=status.HTTP_400_BAD_REQUEST)
        admin.password_hash = make_password(new_pass)
        admin.save(update_fields=['password_hash'])
        return Response({'success': True})


@method_decorator(csrf_exempt, name='dispatch')
class AdminLogoutView(APIView):
    """POST + Authorization: Bearer <token> — выход (инвалидирует токен)."""

    def post(self, request: Request):
        admin = _admin_from_token(request)
        if admin:
            admin.auth_token = ''
            admin.auth_token_expires_at = None
            admin.save(update_fields=['auth_token', 'auth_token_expires_at'])
        return Response({'success': True})
