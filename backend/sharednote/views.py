"""
define view for google login
"""
# pylint: disable=import-error
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

# Create your views here.


# pylint: disable=too-few-public-methods
class GoogleLogin(SocialLoginView):
    """
    use OAuth2 to authenticate user
    """
    adapter_class = GoogleOAuth2Adapter
