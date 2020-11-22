from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse, Http404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from .models import Tweet
from .forms import TweetForm
from .serializers import TweetSerializers, CreateTweetSerializers

def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={})

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
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

        serializers = TweetSerializers(queryset, many=True)

        return Response(serializers.data, status=200) 

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
        queryset.first().delete()
        return Response({"response": "Tweet has been deleted"}, status=200)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
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

    user = request.user
    tweet.likes.add(user)
    
    if tweet.parent:
        content = tweet.parent.content
    else:
        content = tweet.content

    return Response({
        "id": tweet.id,
        "content": content,
        "image": tweet.image or None,
        "likes": tweet.likes.count(),
        "user_id": tweet.user and tweet.user.id or None,
        "parent_id": tweet.parent and tweet.parent.id or None,
        "timestamp": tweet.timestamp
    }, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
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

    user = request.user
    tweet.likes.remove(user)

    if tweet.parent:
        content = tweet.parent.content
    else:
        content = tweet.content
    
    return Response({
        "id": tweet.id,
        "content": content,
        "image": tweet.image or None,
        "likes": tweet.likes.count(),
        "user_id": tweet.user and tweet.user.id or None,
        "parent_id": tweet.parent and tweet.parent.id or None,
        "timestamp": tweet.timestamp
    }, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def retweet_tweet_view(request, *args, **kwargs):
    """ 
    REST API VIEW of Retweet a Tweet
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
        return Response({"message": "Already retweeted by this user"}, status=400)

    instance = Tweet.objects.create(**data)
    serializers = TweetSerializers(instance)

    return Response(serializers.data, status=200)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
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
    serializers = TweetSerializers(qs, many=True)

    return Response(serializers.data, status=200)