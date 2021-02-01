from django.contrib.auth.models import User
from rest_framework import serializers
from ..models import Profile


class ProfileSerializers(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    already_followed = serializers.SerializerMethodField(read_only=True)
    tweet_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'user_id',
            'first_name',
            'last_name',
            'username',
            'bio',
            'location',
            'follower_count',
            'following_count',
            'already_followed',
            'tweet_count'
        ]

    def get_user_id(self, obj):
        return obj.user.id

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_username(self, obj):
        return obj.user.username

    def get_following_count(self, obj):
        return obj.user.following.count()

    def get_follower_count(self, obj):
        return obj.follower.count()

    def get_already_followed(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            return obj.follower.filter(id=user.id).exists()
        return None

    def get_tweet_count(self, obj):
        return obj.user.tweet_set.count()
    

class UserSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['id','username','email']
        



class UpdateProfileSerializers(serializers.ModelSerializer):
    user = UserSerializers(many=False)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'user_id',
            'user',
            'first_name',
            'last_name',
            'username',
            'bio',
            'location',
            'follower_count',
            'following_count'
        ]
        read_only_fields = ['follower_count','following_count','username']

    def get_user_id(self, obj):
        return obj.user.id

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_username(self, obj):
        return obj.user.username

    def get_following_count(self, obj):
        return obj.user.following.count()

    def get_follower_count(self, obj):
        return obj.follower.count()
