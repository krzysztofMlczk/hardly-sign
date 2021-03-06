# Generated by Django 4.0.1 on 2022-05-22 17:26

from django.db import migrations, models
import django_minio_backend.models
import documents.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(storage=django_minio_backend.models.MinioBackend(bucket_name='test-bucket'), upload_to=documents.models.upload_to, verbose_name='Object upload')),
                ('sha256', models.CharField(max_length=64, unique=True)),
            ],
        ),
    ]
