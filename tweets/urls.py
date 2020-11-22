from django.urls import path
from .views import (
    tweet_detail_view, 
    tweets_list_view, 
    tweets_feed_view,
    like_tweet_view, 
    unlike_tweet_view,
    retweet_tweet_view
    )

urlpatterns = [
    path('tweets/', tweets_list_view),
    path('tweets/feeds/', tweets_feed_view),
    path('tweet/<int:tweet_id>', tweet_detail_view, name='tweet_detail'),
    path('tweet/<int:tweet_id>/like', like_tweet_view, name='like_tweet_view'),
    path('tweet/<int:tweet_id>/unlike', unlike_tweet_view, name='unlike_tweet_view'),
    path('tweet/<int:tweet_id>/retweet', retweet_tweet_view, name='retweet_tweet_view'),
]