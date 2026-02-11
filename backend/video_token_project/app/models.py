import uuid
from django.db import models


class AdminUser(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password_hash = models.CharField(max_length=128)
    auth_token = models.CharField(max_length=64, blank=True, default='', db_index=True)
    auth_token_expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.username


class Video(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    file = models.FileField(upload_to='videos/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Token(models.Model):
    class Status(models.TextChoices):
        NEW = 'NEW'
        ACTIVATED = 'ACTIVATED'

    value = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.NEW
    )
    created_at = models.DateTimeField(auto_now_add=True)
    activated_at = models.DateTimeField(null=True, blank=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.value)


class AnalyticsEvent(models.Model):
    type = models.CharField(max_length=100)
    payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
