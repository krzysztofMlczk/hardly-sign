import os

from django.apps import AppConfig

from documents.minio_service import MinioService

minio_service = None


class DocumentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'documents'

    def ready(self):
        global minio_service
        minio_service = MinioService(
            os.environ["MINIO_ENDPOINT"],
            os.environ["MINIO_BUCKET"],
            os.environ["MINIO_ACCESS_KEY"],
            os.environ["MINIO_SECRET_KEY"],
        )
