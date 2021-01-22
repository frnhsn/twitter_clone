from django.urls import path
from .views import (
    TweetCreateListView,
    TweetRetrieveDestroyView,
    tweet_detail_view, 
    tweets_list_view, 
    tweets_feed_view,
    like_tweet_view, 
    unlike_tweet_view,
    retweet_tweet_view
    )

urlpatterns = [
    path('tweets/', TweetCreateListView.as_view()),
    path('tweet/<int:pk>', TweetRetrieveDestroyView.as_view(), name='tweet_detail'),
    path('tweet/<int:tweet_id>/like/', like_tweet_view, name='like_tweet_view'),
    path('tweet/<int:tweet_id>/unlike/', unlike_tweet_view, name='unlike_tweet_view'),
    path('tweet/<int:tweet_id>/retweet/', retweet_tweet_view, name='retweet_tweet_view'),
    path('feeds/', tweets_feed_view),
]