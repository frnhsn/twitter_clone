from django.test import TestCase
from django.contrib.auth import get_user_model

from .models import Tweet

User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='abc', password='somepassword')
        self.tweet = Tweet.objects.create(content="AAAAA", user=self.user)

    def test_user_created(self):
        self.assertEqual(self.user.id, 1)