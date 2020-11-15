from django.urls import path

from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', CustomizeUserViewSet, basename='user')
router.register(r'note', NoteViewSet, basename='note')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'upvote', UpVoteViewSet, basename='upvote')
router.register(r'downvote', DownVoteViewSet, basename='downvote')
router.register(r'course', CourseViewSet, basename='course')
urlpatterns = router.urls
