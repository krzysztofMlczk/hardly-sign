import hashlib
import os

from django.contrib import admin
from django.db import models
from django.db.models.fields.files import FileField
from django.db.models.manager import Manager
from django_minio_backend import MinioBackend

# class Document(models.Model)


def hash_file(file, block_size=65536):
    file.open()
    contents = file.read()  # get the contents
    hasher = hashlib.sha256(contents)
    file.open()
    return hasher.hexdigest()


def upload_to(instance, filename):
    """
    :type instance: dolphin.models.File
    """
    filename_base, filename_ext = os.path.splitext(filename)
    file_hash = hash_file(instance.file)
    return "{0}{1}".format(file_hash, filename_ext)


class File(models.Model):
    file = FileField(
        verbose_name="Object upload",
        storage=MinioBackend(bucket_name="test-bucket"),
        upload_to=upload_to,
    )
    sha256 = models.CharField(max_length=64, null=False, unique=True)

    @property
    @admin.display()
    def url(self):
        return self.file.url

    @property
    @admin.display()
    def file_name(self):
        return self.file.name

    objects = Manager()

    def delete(self, *args, **kwargs):
        """
        Delete must be overridden because the inherited delete method does not call `self.file.delete()`.
        """
        # noinspection PyUnresolvedReferences
        self.file.delete()
        super(File, self).delete(*args, **kwargs)
