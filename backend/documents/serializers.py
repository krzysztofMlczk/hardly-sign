from email.policy import default
from rest_framework import serializers
from documents.models import File, Document, hash_file
from django.utils import timezone


class FileSerializer(serializers.ModelSerializer):
    url = serializers.URLField(read_only=True)
    
    class Meta:
        model = File
        fields = "__all__"
        read_only_fields = ["sha256", "url"]

    def create(self, validated_data):
        file = validated_data["file"]
        sha256 = hash_file(file)
        try:
            found = File.objects.get(sha256=sha256)
            return found
        except File.DoesNotExist:
            return File.objects.create(sha256=sha256, **validated_data)    


class DocumentSerializer(serializers.ModelSerializer):
    file = FileSerializer(many=False, write_only=True)
    name = serializers.ReadOnlyField()
    uploaded = serializers.DateTimeField(read_only=True, default=timezone.now)
    
    class Meta:
        model = Document
        fields = "__all__"
        read_only_fields = []

    def create(self, validated_data):
        user = self.context["user"]
        file_data = validated_data.pop("file")
        filename = file_data["file"].name
        file = FileSerializer().create(file_data)

        return Document.objects.create(file=file, user=user, name=filename)
