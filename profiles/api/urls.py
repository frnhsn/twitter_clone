from django.urls import path
from .views import (
    profile_follow_view
)

urlpatterns = [
    path('<str:username>/follow', profile_follow_view)
]