from django.shortcuts import render
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
        serializers = TweetSerializers(queryset, many=True)

        return Response(serializers.data, status=200) 

    if request.method == 'POST':

        data = request.data

        if (data.get('parent', False)):
            data['parent'] = None

        data['user'] = request.user

        print('data', data)

        new_tweet = Tweet.objects.create(**data)

        print('new_Tweet', new_tweet)

        serializers = TweetSerializers(new_tweet)

        print('New tweet data',serializers.data)

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

    serializers = TweetSerializers(queryset.first())

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

    # If this is a first tweet, create a new tweet with this as a parent
    if tweet.parent is None:
        new_tweet = Tweet.objects.create(content="", image="", parent=tweet, user=request.user)
        serializers = CreateTweetSerializers(data={
            "content": "",
            "image": None,
            "parent": tweet.id,
            "user": request.user.id
        })
    # If this a retweet, seek root tweet and set it as a parent for new retweet
    else:
        serializers = CreateTweetSerializers(data={
            "content": "",
            "image": None,
            "parent": tweet.parent.id,
            "user": request.user.id
        })

    if serializers.is_valid():
        serializers.save()

    return Response(serializers.data, status=200)

