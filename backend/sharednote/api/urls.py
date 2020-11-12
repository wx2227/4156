from django.urls import path

from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'note', NoteViewSet, basename='note')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'commented', CommentedViewSet, basename='commented')
router.register(r'vote', VoteViewSet, basename='vote')
router.register(r'course', CourseViewSet, basename='course')
router.register(r'coursenote', CourseNoteViewSet, basename='coursenote')
router.register(r'upload', UploadViewSet, basename='upload')
urlpatterns = router.urls
