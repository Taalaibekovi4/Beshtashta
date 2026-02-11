from django.contrib import admin
from .models import AdminUser, Video, Token, AnalyticsEvent


@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')
    list_filter = ()
    readonly_fields = ('password_hash',)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description_short', 'created_at')
    list_editable = ('title',)
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    ordering = ('-created_at',)

    def description_short(self, obj):
        if not obj.description:
            return '—'
        return obj.description[:50] + '…' if len(obj.description) > 50 else obj.description

    description_short.short_description = 'Описание'


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    list_display = ('id', 'value', 'status', 'video', 'created_at', 'activated_at')
    list_filter = ('status', 'created_at')
    search_fields = ('value',)
    readonly_fields = ('value', 'created_at', 'activated_at')
    ordering = ('-created_at',)


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'created_at')
    list_filter = ('type', 'created_at')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
