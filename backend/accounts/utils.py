from calendar import timegm
from datetime import datetime
import jwt
from accounts.serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import Token
from django_otp.models import Device


def get_custom_jwt(user, device):
    """
    Helper to generate a JWT for a validated OTP device.
    This resets the orig_iat timestamp, as we've re-validated the user.
    """
    return MyTokenObtainPairSerializer.get_token(user, device)


def otp_is_verified(self, request):
    """
    Helper to determine if user has verified OTP.
    """
    auth = JWTAuthentication()
    user, token = auth.authenticate(request)
    if token is None:
        return False

    payload = token.payload

    persistent_id = payload.get('otp_device_id')
    if persistent_id:
        device = Device.from_persistent_id(persistent_id)
        if (device is not None) and (device.user_id != request.user.id):
            return False
        else:
            # Valid device in JWT
            return True
    else:
        return False