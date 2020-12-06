from django.urls import path
from .views import (
    profile_follow_view,
    ProfileListCreateView
)

urlpatterns = [
    path('', ProfileListCreateView.as_view()),
    path('<str:username>/follow', profile_follow_view)
]