from django.urls import path

from .views import UserViewSet, NoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'note', NoteViewSet, basename='note')
urlpatterns = router.urls
