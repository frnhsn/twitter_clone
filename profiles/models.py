from django.db import models
from django.conf import Settings
from django.db.models.signals import post_save
from django.contrib.auth.models import User

class FollowingRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user','profile')

    def save(self, *args, **kwargs):
        if self.user == self.profile.user:
            return 
        else:
            super().save(*args, **kwargs)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=200, blank=True, null=True)
    bio = models.CharField(max_length=255, blank=True, null=True)
    follower = models.ManyToManyField(
        User, related_name='following', through='FollowingRelation', 
        blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

def create_user_profile(sender, instance, created, *args,**kwargs):
    Profile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)