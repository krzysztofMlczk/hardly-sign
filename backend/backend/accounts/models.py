import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager



class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

