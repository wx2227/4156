"""
register viewsets to router
"""
# pylint: disable=import-error
from rest_framework.routers import DefaultRouter
from .views import CustomizeUserViewSet, NoteViewSet, CommentViewSet, VoteViewSet, CourseViewSet, FavoriteViewSet

ROUTER = DefaultRouter()
ROUTER.register(r'user', CustomizeUserViewSet, basename='user')
ROUTER.register(r'note', NoteViewSet, basename='note')
ROUTER.register(r'comment', CommentViewSet, basename='comment')
ROUTER.register(r'vote', VoteViewSet, basename='vote')
ROUTER.register(r'course', CourseViewSet, basename='course')
ROUTER.register(r'favorite', FavoriteViewSet, basename='favorite')
# pylint: disable=invalid-name
urlpatterns = ROUTER.urls
