import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _

from documents.models import File

from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)

    email = models.EmailField(_("email address"), unique=True, blank=False, null=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    phone_number = PhoneNumberField(null=True, blank=True)
    avatar = models.OneToOneField(File, null=True, blank=True, on_delete=models.CASCADE, related_name="user")

    private_key = models.TextField(unique=True, blank=True, null=True)
    public_key = models.TextField(unique=True, blank=True, null=True)
    certificate = models.TextField(unique=True, blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()

