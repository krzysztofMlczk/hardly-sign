from django.urls import path, re_path
from rest_framework_simplejwt import views as jwt_views

from . import views

app_name = "accounts"

urlpatterns = [
    re_path(
        "^token/?$",
        # jwt_views.TokenObtainPairView.as_view(),
        views.MyTokenObtainPairView.as_view(),
        name="accounts_jwt",
    ),
    re_path(
        "^token/refresh/?$",
        jwt_views.TokenRefreshView.as_view(),
        name="accounts_jwt_refresh",
    ),
    re_path(
        "^me/?$", 
        views.UserView.as_view(), 
        name="me"
    ),
    re_path(
        r'^totp/create/?$', 
        views.TOTPCreateView.as_view(), 
        name='totp-create'
    ),
    re_path(
        r'^totp/login/?$', 
        views.TOTPVerifyView.as_view(), 
        name='totp-login'
    ),
]
