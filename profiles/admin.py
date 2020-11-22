from django.contrib import admin
from .models import FollowingRelation, Profile

class FollowingRelationAdmin(admin.TabularInline):
    model = FollowingRelation

class ProfileAdmin(admin.ModelAdmin):
    inlines = [FollowingRelationAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['user__username', 'user__email']

    class Meta:
        model = Profile

admin.site.register(Profile, ProfileAdmin)

# Register your models here.
