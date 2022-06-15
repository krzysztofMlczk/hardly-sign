from rest_framework.routers import DefaultRouter
from django.urls import path

from . import views

app_name = "accounts"
router = DefaultRouter()

router = DefaultRouter()
router.register(r"documents", views.DocumentViewSet, basename="documents")

urlpatterns = [
    path(r"documents/verify/", views.DocumentVerifyView.as_view(), name="documents-verify"),
] + router.urls
