from django.urls import path
from .views import tweet_detail_view, tweets_list_view, create_tweet_view

urlpatterns = [
    path('', tweets_list_view),
    path('<int:tweet_id>', tweet_detail_view, name='tweet_detail'),
    path('create-tweet', create_tweet_view, name='create_tweet')
]
