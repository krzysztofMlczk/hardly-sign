from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from django.http.response import StreamingHttpResponse

from rest_framework import permissions, serializers, viewsets, status

from accounts.permissions import IsOtpVerified

from Crypto.Hash import SHA256
from Crypto.Signature import PKCS1_v1_5
from Crypto.PublicKey import RSA

import json


class FileViewSet(viewsets.ModelViewSet):
    serializer_class = None  # serializers.FileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOtpVerified]
    http_method_names = [
        "post",
    ]

    def create(self, request):
        file_to_sign = request.FILES["file"].read()
        signer = PKCS1_v1_5.new(RSA.importKey(settings.SIGNING_KEY))
        signature = signer.sign(SHA256.new(file_to_sign))

        return HttpResponse(content=signature, content_type="text/plain")
