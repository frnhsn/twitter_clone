from rest_framework import serializers
from .models import Tweet

class TweetSerializers(serializers.ModelSerializer):
    """ Tweet serializers """
    content = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = '__all__'
        read_only = ['id','timestamp','likes']

    def get_content(self, obj):
        content = obj.content
        if obj.is_retweet():
            content = obj.parent.content
        return content

    def get_likes(self, obj):
        return obj.likes.count()

    # def get_image(self, obj):
    #     image = obj.image 
    #     if obj.is_retweet():
    #         image = obj.parent.image
    #     return image

class CreateTweetSerializers(serializers.ModelSerializer):
    """ Create Tweet serializers """
    content = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ['id','content','image','likes','parent','user','timestamp']
        read_only = ['id','timestamp','likes']
        
    def get_likes(self, obj):
        return obj.likes.count()

    def get_content(self, obj):
        content = obj.content
        if obj.is_retweet():
            content = obj.parent.content
        return content


class CobaSerializers(serializers.ModelSerializer):
    """ Create Tweet serializers """

    class Meta:
        model = Tweet
        fields = ['id','content','image','likes','parent','user','timestamp']
        read_only = ['id','timestamp','likes']
        
    def to_representation(self, instance):
        """ Convert null content for retweeted tweet into parent tweet's content"""

        obj = super().to_representation(instance)
        content = obj['content']
        if obj.is_retweet():
            content = obj.parent.content
        return obj