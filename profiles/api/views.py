from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
import random

from ..models import Profile

from .serializers import ProfileSerializers, UserSerializers, UpdateProfileSerializers 
from tweets.api.serializers import TweetSerializers

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_unfollow_view(request, username, *args, **kwargs):
    """ 
    REST API VIEW of following profile
    Return JSON data
    """
    me = request.user

    try:
        profile_to_unfollow = Profile.objects.get(user__username=username)
    except:
        return Response({
            'details': 'Username not found'
        }, status=status.HTTP_404_NOT_FOUND)

    already_unfollowed = profile_to_unfollow.follower.filter(id=me.id).exists()

    if me and already_unfollowed:
        profile_to_unfollow.follower.remove(me)

    serializer = ProfileSerializers(profile_to_unfollow, context={'request':request})

    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def following_view(request, username, *args, **kwargs):
    """ 
    REST API VIEW of who follow this user
    Return JSON data
    """

    try:
        user = User.objects.get(username=username)
    except:
        return Response({
            'details': 'Username not found'
        }, status=status.HTTP_404_NOT_FOUND)

    following = Profile.objects.filter(follower=user)
    serializer = ProfileSerializers(following, context={'request':request}, many=True)

    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers_view(request, username, *args, **kwargs):
    """ 
    REST API VIEW of who follow this user
    Return JSON data
    """

    try:
        user = User.objects.get(username=username)
    except:
        return Response({
            'details': 'Username not found'
        }, status=status.HTTP_404_NOT_FOUND)

    users_id_who_follow = [user.id for user in Profile.objects.get(user=user).follower.all()]
    followers = Profile.objects.filter(user__id__in=users_id_who_follow)
    serializer = ProfileSerializers(followers, context={'request':request}, many=True)

    return Response(serializer.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_follow_view(request, username, *args, **kwargs):
    """ 
    REST API VIEW of following profile
    Return JSON data
    """

    me = request.user

    try:
        profile_to_follow = Profile.objects.get(user__username=username)
    except:
        return Response({
            'details': 'Username not found'
        }, status=status.HTTP_404_NOT_FOUND)

    already_followed = profile_to_follow.follower.filter(id=me.id).exists()
    
    if not already_followed: 
        profile_to_follow.follower.add(me)
        profile_to_follow.save()

    serializer = ProfileSerializers(profile_to_follow, context={'request':request})

    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def retrieve_profile_view(request, username, *args, **kwargs):
    try:
        profile = Profile.objects.get(user__username=username)
    except:
        return Response({
            'details': 'Username not found'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializers(profile, context={'request':request})

    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def retrieve_tweets_view(request, username, *args, **kwargs):
    try:
        user = User.objects.get(username=username)
    except:
        return Response({
            'details': 'Username not found'
        }, status=status.HTTP_404_NOT_FOUND)

    tweets = user.tweet_set.all()
    serializer = TweetSerializers(tweets, context={'request':request}, many=True)

    return Response(serializer.data, status=200)

@api_view(['GET','PUT','PATCH'])
@permission_classes([IsAuthenticated])
def retrieve_update_own_profile_view(request, *args, **kwargs):
    user = request.user
    data = request.data
    user_obj = User.objects.get(id=user.id)
    profile_obj = Profile.objects.get(user=user)

    if request.method == 'GET':
        serializer = ProfileSerializers(profile_obj, context={'request': request})
        return Response(serializer.data, status=200)

    if request.method == 'PUT':
        with transaction.atomic():
            user_obj.first_name = data.get('first_name')
            user_obj.last_name = data.get('last_name')
            profile_obj.location = data.get('location')
            profile_obj.bio = data.get('bio')
            user_obj.save()
            profile_obj.save()
        serializer = ProfileSerializers(profile_obj)

        return Response(serializer.data, status=200)

    if request.method == 'PATCH':
        with transaction.atomic():
            user_obj.first_name = data.get('first_name', user_obj.first_name)
            user_obj.last_name = data.get('last_name', user_obj.last_name)
            profile_obj.location = data.get('location', profile_obj.location)
            profile_obj.bio = data.get('bio', profile_obj.bio)
            user_obj.save()
            profile_obj.save()
        serializer = ProfileSerializers(profile_obj)

        return Response(serializer.data, status=200)

    else:
        return Response({
            'details': 'Forbidden access'
        }, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def who_to_follow_view(request, *args, **kwargs):
    me = request.user
    
    if me:
        profiles_id = list(Profile.objects.exclude(Q(follower=me) | Q(user=me)).values_list('id',flat=True))

        if len(profiles_id) > 0:
            if len(profiles_id) < 4:
                length = len(profiles_id)
            else:
                length = 4

            rand_entities = random.sample(profiles_id, length)
            profiles = Profile.objects.filter(id__in=rand_entities)
            serializer = ProfileSerializers(profiles, many=True)

            return Response(serializer.data, status=200)
        
        return Response([], status=200)