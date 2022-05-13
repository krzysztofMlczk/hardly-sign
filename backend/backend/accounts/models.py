import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    is_active = models.BooleanField(default=True)
    phone_number = PhoneNumberField(null=False)
    
    objects = UserManager()

