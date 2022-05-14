from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from accounts.models import User


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
    class Meta:
        model = User
        fields = ("id", "email")
