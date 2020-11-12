from django.urls import path

from .views import UserViewSet, NoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'note', NoteViewSet, basename='note')
router.register(r'comment', NoteViewSet, basename='comment')
router.register(r'commented', NoteViewSet, basename='commented')
router.register(r'vote', NoteViewSet, basename='vote')
router.register(r'course', NoteViewSet, basename='course')
router.register(r'coursenote', NoteViewSet, basename='coursenote')
router.register(r'upload', NoteViewSet, basename='upload')
urlpatterns = router.urls
