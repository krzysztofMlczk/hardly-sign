# Generated by Django 4.0.1 on 2022-06-04 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar',
        ),
    ]
