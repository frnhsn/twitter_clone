from django.db import models
from django.contrib.auth.models import User

class TweetLike(models.Model):
    """Model definition for TweetLike. An pivot table for User and Tweet"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Meta definition for TweetLike."""

        verbose_name = 'TweetLike'
        verbose_name_plural = 'TweetLikes'
        unique_together = ('user','tweet')

    def __str__(self):
        """Unicode representation of TweetLike."""
        return ""


class Tweet(models.Model):
    """Model definition for Tweet."""

    content = models.TextField(max_length=255, blank=True)
    likes = models.ManyToManyField(User, related_name='tweet_user', through=TweetLike, blank=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Meta definition for Tweet."""

        verbose_name = 'Tweet'
        verbose_name_plural = 'Tweets'

    def __str__(self):
        """Unicode representation of Tweet."""
        if self.is_retweet():
            return "Retweet: " + self.parent.content
        return self.content

    def is_retweet(self):
        """Return True if the tweet is a retweet"""
        if self.parent:
            return True
        return False


