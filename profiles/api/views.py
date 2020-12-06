from django.shortcuts import render
from django.http import JsonResponse, Http404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView

from ..models import Profile

from ..serializers import ProfileSerializer

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def profile_follow_view(request, username, *args, **kwargs):
    """ 
    REST API VIEW of following profile
    Return JSON data
    """

    if request.method == 'GET':
        print(username)
        return Response(username, status=200)

    me = request.user
    other_profiles = Profile.objects.filter(user__username=username)

    if not other_profiles.exists():
        return Response({}, status=404)

    profile = other_profiles.first()
    profile.follower.add(me)
    profile.save()

    return Response({
        "username": profile.user.username,
        "follower_count": profile.follower.count(),
        "is_following": me in profile.follower.all()
    }, status=200)
        
class ProfileListCreateView(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

# eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InVuYW1ldW5hbWUiLCJleHAiOjE2MDcxNTMyMjgsImVtYWlsIjoiIn0.5A1t9pazzRdcy8feTLgEifP9qxx55w1FoOElhSF8dEI