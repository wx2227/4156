# Generated by Django 3.0.8 on 2020-12-01 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharednote', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customizeuser',
            name='nick_name',
            field=models.TextField(default='Muxenakhy', max_length=30),
        ),
    ]
