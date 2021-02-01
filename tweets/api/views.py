from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse, Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.exceptions import PermissionDenied

from ..permissions import IsOwnerOrReadOnly
from tweets.models import Tweet
from .serializers import TweetSerializers, CreateTweetSerializers
from utils.paginations import get_paginated_response


class TweetCreateListView(ListCreateAPIView):
    """ 
    REST API VIEW of tweets list
    Return JSON data
    """
    queryset = Tweet.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if (self.request.method == 'POST'):
            return CreateTweetSerializers
        return TweetSerializers

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        tweet_obj = Tweet.objects.get(id=serializer.data['id'])
        return_serializers = TweetSerializers(tweet_obj)
        return Response(return_serializers.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
class TweetRetrieveDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializers
    permission_classes = [IsOwnerOrReadOnly]


@api_view(['GET','POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def tweets_list_view(request, *args, **kwargs):
    """ 
    REST API VIEW of tweets list
    Return JSON data
    """

    if request.method == 'GET':
        queryset = Tweet.objects.all()
        username = request.GET.get('username')

        if username:
            queryset = Tweet.objects.by_username(username)

        return get_paginated_response(queryset, TweetSerializers, request)

    if request.method == 'POST':
        data = request.data

        if (data.get('parent', False)):
            data['parent'] = None

        data['user'] = request.user
        new_tweet = Tweet.objects.create(**data)
        serializers = TweetSerializers(new_tweet)

        return Response(serializers.data, status=200)

@api_view(['GET','DELETE'])
def tweet_detail_view(request, *args, **kwargs):
    """ 
    REST API VIEW of tweet detail
    Return JSON data
    """

    tweet_id = int(kwargs['tweet_id'])
    queryset = Tweet.objects.filter(id=tweet_id)

    if not queryset.exists():
        return Response({"message": "Tweet not found"}, status=404)

    tweet = queryset.first()
    serializers = TweetSerializers(tweet)

    if request.method == 'GET':
        return Response({"response": serializers.data}, status=200)
    if request.method == 'DELETE':
        user = request.user
        if not user.is_authenticated() and tweet.user is user:
            raise PermissionDenied()
        queryset.first().delete()
        return Response({}, status=204)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_tweet_view(request, *args, **kwargs):
    """ 
    REST API VIEW of Like a Tweet
    Return JSON data
    """

    tweet_id = int(kwargs['tweet_id'])
    tweet_obj = Tweet.objects.filter(id=tweet_id)
    
    if not tweet_obj.exists():
        return Response({"message": "Tweet not found"}, status=404)

    tweet = tweet_obj.first()

    if tweet.is_retweet():
        if tweet.parent:
            tweet = tweet.parent
        else:
            return Response({"message": "Parent tweet not found"}, status=404)

    user = request.user
    tweet.likes.add(user)

    serializer = TweetSerializers(tweet, context={'request': request})

    return Response(serializer.data, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_tweet_view(request, *args, **kwargs):
    """ 
    REST API VIEW of Unlike a Tweet
    Return JSON data
    """

    tweet_id = int(kwargs['tweet_id'])
    tweet_obj = Tweet.objects.filter(id=tweet_id)
    
    if not tweet_obj.exists():
        return Response({"message": "Tweet not found"}, status=404)

    tweet = tweet_obj.first()

    if tweet.is_retweet():
        if tweet.parent:
            tweet = tweet.parent
        else:
            return Response({"message": "Parent tweet not found"}, status=404)

    user = request.user
    tweet.likes.remove(user)

    serializer = TweetSerializers(tweet, context={'request': request})

    return Response(serializer.data, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retweet_tweet_view(request, *args, **kwargs):
    """ 
    REST API VIEW of Retweet 
    Return JSON data
    """

    tweet_id = int(kwargs['tweet_id'])
    tweet_obj = Tweet.objects.filter(id=tweet_id)
    
    if not tweet_obj.exists():
        return Response({"message": "Tweet not found"}, status=404)

    tweet = tweet_obj.first()
    user = request.user

    # If this is a first tweet, create a new tweet with this tweet as a parent
    if tweet.parent is None:
        data = {
            "content": "",
            "image": None,
            "parent": tweet,
            "user": request.user
        }
    # If this a retweet, find root tweet and set it as a parent
    else:
        data = {
            "content": "",
            "image": None,
            "parent": tweet.parent,
            "user": request.user
        }

    existing_retweet = Tweet.objects.filter(parent=data["parent"], user=request.user)

    if existing_retweet.count() > 0:
        serializers = TweetSerializers(existing_retweet.first())
    else:
        instance = Tweet.objects.create(**data)
        serializers = TweetSerializers(instance, context={'request': request})

    return Response(serializers.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def untweet_view(request, *args, **kwargs):
    """ 
    REST API VIEW of unretweet
    Return JSON data
    """

    tweet_id = int(kwargs['tweet_id'])
    tweet_obj = Tweet.objects.filter(id=tweet_id)
    
    if not tweet_obj.exists():
        return Response({"message": "Tweet not found"}, status=404)

    tweet = tweet_obj.first()
    if tweet.user is not user:
        return Response({"message": "You don't have permission to access this resource"}, status=403)

    if not tweet.is_retweet():
        return Response({"message": "This is not a retweet"}, status=404)

    tweet.delete()

    return Response({}, status=204)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_tweet_view(request, *args, **kwargs):
    """ 
    REST API VIEW of Remove a Tweeet
    Return JSON data
    """

    tweet_id = int(kwargs['tweet_id'])
    tweet_obj = Tweet.objects.filter(id=tweet_id)
    
    if not tweet_obj.exists():
        return Response({"message": "Tweet not found"}, status=404)

    tweet = tweet_obj.first()
    if tweet.user is not user:
        return Response({"message": "You don't have permission to access this resource"}, status=403)

    tweet.delete()

    return Response({}, status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweets_feed_view(request, *args, **kwargs):
    """ 
    REST API VIEW of tweets feed    
    Return JSON data
    """

    user = request.user
    following_user_id = []

    if user.following.exists():
        following_user_id = user.following.values_list("user_id", flat=True)

    qs = Tweet.objects.filter(
        Q(user__id__in=following_user_id) | Q(user=user)).distinct().order_by('-timestamp')

    serializer = TweetSerializers(qs, many=True, context={'request': request})

    return Response(serializer.data, status=200)

