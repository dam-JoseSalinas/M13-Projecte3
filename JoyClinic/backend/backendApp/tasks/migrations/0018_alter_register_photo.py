# Generated by Django 5.0.3 on 2024-05-01 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0017_alter_register_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='register',
            name='photo',
            field=models.ImageField(blank=True, default='default.jpg', upload_to='frontEndApp/assets/images/foto_perfil/'),
        ),
    ]
