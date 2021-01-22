"""twitter_clone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from  accounts.api.views import (MyObtainTokenPairView, )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/jwt/create', MyObtainTokenPairView.as_view()),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/', include('tweets.api.urls')),
    path('api/profile/', include('profiles.api.urls')),
    path('account/', include('accounts.urls')),
    path('profiles/', include('profiles.urls')),
]