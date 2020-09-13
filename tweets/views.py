from django.shortcuts import render
from django.http import JsonResponse, Http404

from .models import Tweet
from .forms import TweetForm
from .serializers import TweetSerializers

def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={})

def create_tweet_view(request):
    
    if request.method == 'POST':
        form = TweetForm(request.POST)

        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()

    form = TweetForm()

    return render(request, 'components/forms.html', context={"form": form})

def tweets_list_view(request):
    """ 
    REST API VIEW of tweets list
    Return JSON data
    """
    qs = Tweet.objects.all()
    data = [{"id": tweet.id, "content": tweet.content, "image": tweet.image or None} for tweet in qs]

    return JsonResponse({
        "response": data
    }, status=200)

def tweet_detail_view(request, *args, **kwargs):
    """ 
    REST API VIEW of tweet detail
    Return JSON data
    """
    tweet_id = int(kwargs['tweet_id'])

    try:
        obj = Tweet.objects.get(id=tweet_id)
        data = {}
        data['id'] = obj.id
        data['content'] = obj.content
        data['image'] = obj.image or None
    except:
        raise Http404
        
    return JsonResponse(data, status=200)
