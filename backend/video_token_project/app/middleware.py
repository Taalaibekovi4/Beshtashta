from django.utils.deprecation import MiddlewareMixin


class CorsMiddleware(MiddlewareMixin):
    """Добавляет CORS-заголовки для запросов с фронта (Vite dev)."""

    def process_response(self, request, response):
        origin = request.META.get('HTTP_ORIGIN', '')
        if origin in ('http://localhost:5173', 'http://127.0.0.1:5173'):
            response['Access-Control-Allow-Origin'] = origin
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response

    def process_request(self, request):
        if request.method == 'OPTIONS':
            from django.http import HttpResponse
            r = HttpResponse()
            origin = request.META.get('HTTP_ORIGIN', '')
            if origin in ('http://localhost:5173', 'http://127.0.0.1:5173'):
                r['Access-Control-Allow-Origin'] = origin
            r['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
            r['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            r['Access-Control-Max-Age'] = '86400'
            return r
        return None
