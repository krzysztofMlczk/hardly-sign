from rest_framework import serializers

from documents.models import File


class FileSerializer(serializers.ModelSerializer):
    url = serializers.URLField(read_only=True)
    
    class Meta:
        model = File
        fields = '__all__'
        read_only_fields = ['sha256', 'url']
