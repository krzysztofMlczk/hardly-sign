from rest_framework.routers import DefaultRouter

from . import views

app_name = "accounts"
router = DefaultRouter()

router = DefaultRouter()
router.register(r"documents", views.FileViewSet, basename="documents")

urlpatterns = router.urls
