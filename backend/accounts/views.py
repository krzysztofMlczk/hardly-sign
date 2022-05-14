import time
from accounts.permissions import IsOtpVerified
from accounts.serializers import MyTokenObtainPairSerializer
from accounts.utils import get_custom_jwt
from rest_framework import views, permissions
from rest_framework.response import Response
from rest_framework import status
from django_otp import devices_for_user
from django_otp.oath import TOTP
from django_otp import verify_token
from django_otp.plugins.otp_totp.models import TOTPDevice
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


def get_user_totp_device(self, user, confirmed=None):
    devices = devices_for_user(user, confirmed=confirmed)
    for device in devices:
        if isinstance(device, TOTPDevice):
            return device

class UserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsOtpVerified]

    def get(self, request, format=None):
        user = request.user

        return Response(user.email, status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class TOTPCreateView(views.APIView):
    """
    Use this endpoint to set up a new TOTP device
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        device = get_user_totp_device(self, user)
        if not device:
            device = user.totpdevice_set.create(confirmed=False)

        # TODO fake sms
        key = TOTP(key=device.bin_key, step=device.step, t0=device.t0, digits=device.digits, drift=device.drift).token()

        print(f"\033[93mFAKE SMS CODE: \033[4m{key}")

        return Response(status=status.HTTP_201_CREATED)


class TOTPVerifyView(views.APIView):
    """
    Use this endpoint to verify/enable a TOTP device
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        device = get_user_totp_device(self, user)
        token = request.data['token']

        if device is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if device.verify_token(token):
            if not device.confirmed:
                device.confirmed = True
                device.save()
            token = get_custom_jwt(user, device)
            # token = RefreshToken.for_user(user, device)
            return Response({"refresh": str(token), "access": str(token.access_token)}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
