from rest_framework import serializers
from ..models import Tweet

from profiles.api.serializers import ProfileSerializers

class TweetSerializers(serializers.ModelSerializer):
    """ Tweet serializers """
    content = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    retweet_count = serializers.SerializerMethodField()
    is_a_retweet = serializers.SerializerMethodField()
    is_already_retweeted = serializers.SerializerMethodField()
    is_already_liked = serializers.SerializerMethodField()
    user = ProfileSerializers(source='user.profile')
    retweeted_from = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = [
            'id',
            'content', # replaced by serializers method field
            'image',
            'likes_count', # replaced by serializers method field
            'retweet_count', # replaced by serializers method field
            'user', # replaced by serializers method field
            'parent',
            'is_a_retweet', # custom serializers method field
            'is_already_liked',
            'is_already_retweeted',
            'retweeted_from',
            'timestamp'
            ]
        read_only = [
            'id',
            'timestamp',
            'likes',
            'is_a_retweet'
            ]

    def get_content(self, obj):
        content = obj.content
        if obj.is_retweet():
            if obj.parent:
                content = obj.parent.content
        return content

    def get_likes_count(self, obj):
        if obj.is_retweet():
            if obj.parent:
                return obj.parent.likes.count()
        else:
            return obj.likes.count()
        return 0

    def get_retweet_count(self, obj):
        if obj.is_retweet:
            if obj.parent:
                return Tweet.objects.filter(parent__id=obj.parent.id).count()
        return 0

    def get_is_a_retweet(self, obj):
        return obj.is_retweet()

    def get_is_already_liked(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if obj.is_retweet():
                tweet_obj = obj.parent
            else:
                tweet_obj = obj
            return tweet_obj.likes.filter(id=user.id).exists()
        return None

    def get_is_already_retweeted(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if obj.user == user and obj.is_retweet():
                return True
            else:
                return False
        return None

    def get_retweeted_from(self, obj):
        if obj.is_retweet():
            if obj.parent:
                profile = obj.parent.user.profile
                serializer = ProfileSerializers(profile)
                return serializer.data
        return None

class CreateTweetSerializers(serializers.ModelSerializer):
    """ 
    Ini adalah serializer pembuatan tweet. Serializer ini memastikan parent-child tweet
    hanya akan memiliki satu tingkatan. Retweet tidak dapat dilakukan dengan serializers
    ini.
    """

    class Meta:
        model = Tweet
        fields = '__all__'
        read_only = ['id','timestamp']

    def validate_content(self, value):
        """
        Minimal panjang tweet 10 karakter
        """
        if len(value) < 10:
            raise serializers.ValidationError("Tweet is too short. Try with minimum 10 characters length")
        return value

