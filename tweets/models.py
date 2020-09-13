from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tweet(models.Model):
    """Model definition for Tweet."""

    content = models.TextField(max_length=255)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        """Meta definition for Tweet."""

        verbose_name = 'Tweet'
        verbose_name_plural = 'Tweets'

    def __str__(self):
        """Unicode representation of Tweet."""
        return self.content
