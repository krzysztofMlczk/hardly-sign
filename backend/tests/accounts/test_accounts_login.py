from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase

User = get_user_model()


class RegistrationTest(APITransactionTestCase):
    @classmethod
    def setUpClass(cls):
        cls.jwt_token_url = reverse("accounts:accounts_jwt")
        cls.refresh_token_url = reverse("accounts:accounts_jwt_refresh")

        cls.data = {"email": "foobar@example.com", "password": "somepassword1"}

    def test_login_not_activated_account(self):
        #self.client.post(self.register_url, self.data, format="json")
        User.objects.create_user(self.data.get("email"), self.data.get("password"))
        
        login_response = self.client.post(self.jwt_token_url, self.data, format="json")

        self.assertEquals(login_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_obtain_token_pair(self):
        # self.client.post(self.register_url, self.data, format="json")
        User.objects.create_user(self.data.get("email"), self.data.get("password"))
        user = User.objects.get(email=self.data.get("email"))
        user.is_active = True
        user.save()

        login_response = self.client.post(self.jwt_token_url, self.data, format="json")

        self.assertEquals(login_response.status_code, status.HTTP_200_OK)
        self.assertEquals(list(login_response.data.keys()), ["refresh", "access"])

    def test_refresh_acces_token(self):
        # self.client.post(self.register_url, self.data, format="json")
        User.objects.create_user(self.data.get("email"), self.data.get("password"))
        user = User.objects.get(email=self.data.get("email"))
        user.is_active = True
        user.save()

        login_response = self.client.post(self.jwt_token_url, self.data, format="json")

        refresh_response = self.client.post(
            self.refresh_token_url,
            {"refresh": login_response.data["refresh"]},
            format="json",
        )

        self.assertEquals(refresh_response.status_code, status.HTTP_200_OK)
        self.assertEquals(list(refresh_response.data.keys()), ["access"])
        self.assertNotEquals(
            refresh_response.data["access"], login_response.data["access"]
        )

    def test_wrong_login(self):
        # self.client.post(self.register_url, self.data, format="json")
        User.objects.create_user(self.data.get("email"), self.data.get("password"))

        wrong_data = {"email": "foobar@example.com", "password": "somepassword"}

        login_response = self.client.post(self.jwt_token_url, wrong_data, format="json")

        self.assertEquals(login_response.status_code, status.HTTP_401_UNAUTHORIZED)
