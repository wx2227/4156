"""
self-defined adapter for google login
"""
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.utils import user_field


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    """
    add avatar to user table from google login
    """

    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)
        user_field(user, "avatar", sociallogin.account.extra_data['picture'])
        return user
