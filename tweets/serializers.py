from rest_framework import serializers
from .models import Tweet

class TweetSerializers(serializers.ModelSerializer):
    """ Tweet serializers """

    class Meta:
        model = Tweet
        fields = ['content']