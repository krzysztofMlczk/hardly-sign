from wsgiref.simple_server import WSGIRequestHandler
from django.db.models.query import QuerySet
from django.contrib import admin

from documents import models

# Register your models here.

def delete_everywhere(
    model_admin: models.File,
    request: WSGIRequestHandler,
    queryset: QuerySet,
):
    """
    Delete object both in Django and in MinIO too.

    """
    del model_admin, request
    for obj in queryset:
        obj.delete()


delete_everywhere.short_description = "Delete selected objects in Django and MinIO"


@admin.register(models.File)
class FileModelAdmin(admin.ModelAdmin):
    fields = ("file", "sha256")
    readonly_fields = ("sha256",)
    actions = [
        delete_everywhere,
    ]

    list_display = ("file_name", "url")

    def save_model(self, request, obj, form, change):
        # obj.file_name = obj.file.name
        sha256 = models.hash_file(obj.file)
        obj.sha256 = sha256
        super().save_model(request, obj, form, change)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions
