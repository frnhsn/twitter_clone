from django.urls import path
from .views import (
    profile_follow_view,
    profile_unfollow_view,
    retrieve_profile_view,
    who_to_follow_view,
    following_view,
    followers_view,
    retrieve_update_own_profile_view,
    retrieve_tweets_view
)

urlpatterns = [
    path('me/', retrieve_update_own_profile_view),
    path('who-to-follow/', who_to_follow_view),
    path('<str:username>/', retrieve_profile_view),
    path('<str:username>/following/', following_view),
    path('<str:username>/followers/', followers_view),
    path('<str:username>/follow/', profile_follow_view),
    path('<str:username>/unfollow/', profile_unfollow_view),
    path('<str:username>/tweets/', retrieve_tweets_view),
]