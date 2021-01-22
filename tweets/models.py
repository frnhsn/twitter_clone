from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth.models import User 

# User = settings.AUTH_USER_MODEL

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


class TweetQuerySet(models.QuerySet):
    def feed(self, user):
        following_user_id = []

        if user.following.exists():
            following_user_id = user.following.values_list("user_id", flat=True)

        return self.filter(
            Q(user__id__in=following_user_id) | Q(user=user)).distinct().order_by('-timestamp')

    def by_username(self, username):
        return self.filter(user__username__iexact=username)


class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)

    def by_username(self, username):
        return self.get_queryset().by_username(username)


class Tweet(models.Model):
    """Model definition for Tweet."""

    content = models.TextField(max_length=255, blank=True)
    likes = models.ManyToManyField(User, related_name='tweet_user', through=TweetLike, blank=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, default=None)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()

    class Meta:
        """Meta definition for Tweet."""

        verbose_name = 'Tweet'
        verbose_name_plural = 'Tweets'

    def __str__(self):
        """Unicode representation of Tweet."""
        if self.is_retweet():
            return str(self.id) + " - " + self.parent.content +\
                " (retweeted id:" + str(self.parent.id) + ")"
        return str(self.id) + " - " + self.content

    def is_retweet(self):
        """Return True if the tweet is a retweet"""
        if self.parent:
            return True
        return False

    def is_already_retweeted(self, user=None):
        """Take an user as an argument and return True if this tweet already retweeted by user"""
        if user is not None and self.is_retweet():
            existing_retweet = Tweet.objects.filter(parent=self.parent, user=user)
            if existing_retweet.count() > 0:
                return True
            else:
                return False
        return None

    def is_already_liked(self, user=None):
        """Take an user as an argument and return True if this tweet already liked by user"""
        if user is not None:
            return self.likes.filter(id=user.id).exists()
