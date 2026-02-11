from django.urls import path
from .views import (
    VideoListCreateView,
    VideoDetailView,
    TokenListCreateView,
    ActivateView,
    AnalyticsSummaryView,
    RecordViewView,
    AdminLoginView,
    AdminChangePasswordView,
    AdminLogoutView,
)

urlpatterns = [
    path('videos/', VideoListCreateView.as_view(), name='video-list-create'),
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video-detail'),
    path('tokens/', TokenListCreateView.as_view(), name='token-list-create'),
    path('activate/', ActivateView.as_view(), name='activate'),
    path('analytics/summary/', AnalyticsSummaryView.as_view(), name='analytics-summary'),
    path('analytics/view/', RecordViewView.as_view(), name='analytics-record-view'),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/change-password/', AdminChangePasswordView.as_view(), name='admin-change-password'),
    path('admin/logout/', AdminLogoutView.as_view(), name='admin-logout'),
]