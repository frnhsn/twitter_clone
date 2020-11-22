from django import forms

from .models import Tweet

MAX_TWEET_LENGTH = 255

class TweetForm(forms.ModelForm):
    """TweetForm definition."""
    content = forms.CharField(max_length=255, required=True)

    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) > MAX_TWEET_LENGTH:
            raise forms.ValidationError("This tweet is more than 255 characters")
    
        return content