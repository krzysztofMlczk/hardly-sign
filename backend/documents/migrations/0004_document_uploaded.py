# Generated by Django 4.0.1 on 2022-06-04 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0003_document_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='uploaded',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
