import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    email = models.EmailField(_("email address"), unique=True, blank=False, null=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    phone_number = PhoneNumberField(null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()

