from django.urls import path
from .views import (
    login_view,
    registration_view,
    logout_view
)

urlpatterns = [
    path('login/', login_view),
    path('register/', registration_view),
    path('logout/', logout_view)
]