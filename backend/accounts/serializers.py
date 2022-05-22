from urllib import response
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from accounts.models import User
from documents.apps import minio_service as minio
from documents.minio_service import FileNotFoundInStorage


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user, device = None):
        token = super().get_token(user)

        # custom additions
        if (user is not None) and (device is not None) and (device.user_id == user.id) and (device.confirmed is True):
            token['otp_device_id'] = device.persistent_id
        else:
            token['otp_device_id'] = None
            # Add custom claims

        return token


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(read_only=True)

    def get_avatar(self, obj):
        object_name = obj.avatar.file_name
        try:
            response = minio.get_external_url(object_name)
        except FileNotFoundInStorage:
            return ""
        return response

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "phone_number", "avatar")
