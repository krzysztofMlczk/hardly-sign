from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from . import views

app_name = "accounts"

urlpatterns = [
    path(
        "token/",
        jwt_views.TokenObtainPairView.as_view(),
        name="accounts_jwt",
    ),
    path(
        "token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="accounts_jwt_refresh",
    ),
]
