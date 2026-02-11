from rest_framework import serializers
from .models import Video, Token


class VideoSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'location', 'file', 'video_url', 'created_at']
        read_only_fields = ['video_url', 'created_at']

    def get_video_url(self, obj):
        if not obj.file:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['id', 'value', 'status', 'video', 'created_at', 'activated_at']
        read_only_fields = ['value', 'status', 'created_at', 'activated_at']
