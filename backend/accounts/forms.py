from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class UserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("email", "password")


class UserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ("email",)
