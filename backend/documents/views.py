from django.http import FileResponse, HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf import settings

from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action

from accounts.permissions import IsOtpVerified
from accounts.models import User

from Crypto.Hash import SHA256
from Crypto.Signature import PKCS1_v1_5
from Crypto.PublicKey import RSA

from PyPDF2 import PdfFileReader, PdfFileWriter
from documents.models import Document
from documents.serializers import DocumentSerializer
import io

from documents.utils import bytes_to_file


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOtpVerified]
    http_method_names = [
        "post", "get"
    ]

    def get_queryset(self):
        queryset = Document.objects.all()
        return queryset.filter(user=self.request.user)

    def create(self, request):
        file_to_sign = request.FILES["file"]
        file_name = file_to_sign.name
        user = request.user
        
        file_to_sign.seek(0)
        reader = PdfFileReader(file_to_sign)
        writer = PdfFileWriter()

        writer.appendPagesFromReader(reader)
        metadata = reader.getDocumentInfo()
        writer.addMetadata(metadata)
        writer.addMetadata({"/Signature": ""})
        writer.addMetadata({"/NeedAppearances": ""})
        file_to_sign = io.BytesIO()
        writer.write(file_to_sign)
        file_to_sign.seek(0)

        file_to_sign.seek(0)
        reader = PdfFileReader(file_to_sign)
        writer = PdfFileWriter()

        writer.appendPagesFromReader(reader)
        metadata = reader.getDocumentInfo()
        writer.addMetadata(metadata)
        writer.addMetadata({"/Signature": ""})
        writer.addMetadata({"/NeedAppearances": ""})
        file_to_sign = io.BytesIO()
        writer.write(file_to_sign)
        file_to_sign.seek(0)

        file_to_sign.seek(0)
        reader = PdfFileReader(file_to_sign)
        writer = PdfFileWriter()

        writer.appendPagesFromReader(reader)
        metadata = reader.getDocumentInfo()
        writer.addMetadata(metadata)
        writer.addMetadata({"/Signature": ""})
        writer.addMetadata({"/NeedAppearances": ""})
        file_to_sign = io.BytesIO()
        writer.write(file_to_sign)
        file_to_sign.seek(0)

        # Create document signature with unique key for given user
        signer = PKCS1_v1_5.new(RSA.importKey(user.private_key))
        signature = signer.sign(SHA256.new(file_to_sign.read()))

        # Add signature to PDF metadata and return signed file
        file_to_sign.seek(0)
        reader = PdfFileReader(file_to_sign)
        writer = PdfFileWriter()

        writer.appendPagesFromReader(reader)
        metadata = reader.getDocumentInfo()
        writer.addMetadata(metadata)

        writer.addMetadata({"/Signature": signature})
        writer.addMetadata({"/NeedAppearances": ""})

        signed_file = io.BytesIO()
        writer.write(signed_file)
        signed_file.seek(0)

        file = bytes_to_file(signed_file, file_name)
        serializer = DocumentSerializer(data={"file": {"file": file}}, context={"user": user}) # XD 

        if serializer.is_valid():
            file = serializer.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
        return FileResponse(signed_file, as_attachment=True, filename=file_name, content_type="text/pdf")

    @action(
        detail=True, methods=["get"]
    )
    def download(self, request, pk=None):
        document = self.get_object()

        if document.file is None:
            return Response({"detail": "Cannot locate file."})

        return FileResponse(
            document.file.file.open(), as_attachment=True, filename=document.name, content_type="text/pdf")


class DocumentVerifyView(APIView):
    serializer_class = None  # serializers.FileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOtpVerified]

    def post(self, request):
        file_to_verify = request.FILES["file"]
        user = User.objects.get(email=request.data["user_email"])

        file_to_verify.seek(0)
        reader = PdfFileReader(file_to_verify)
        writer = PdfFileWriter()

        writer.appendPagesFromReader(reader)
        metadata = reader.getDocumentInfo()
        signature = metadata.get("/Signature")

        # Remove value of signature from file so it generates 
        # the same hash as before adding signature
        writer.addMetadata(metadata)
        writer.addMetadata({"/Signature": ""})
        writer.addMetadata({"/NeedAppearances": ""})
        file_to_verify = io.BytesIO()
        writer.write(file_to_verify)
        file_to_verify.seek(0)

        file_hash = SHA256.new(file_to_verify.read())
        file_to_verify.seek(0)

        signer = PKCS1_v1_5.new(RSA.importKey(user.public_key))
        
        if signer.verify(file_hash, signature):
            return HttpResponse(content=b"Verified ok", status=200)
        else:
            return HttpResponse(content=b"Signature not verified", status=400)
