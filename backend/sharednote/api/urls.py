from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', CustomizeUserViewSet, basename='user')
router.register(r'note', NoteViewSet, basename='note')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'vote', VoteViewSet, basename='vote')
router.register(r'course', CourseViewSet, basename='course')
urlpatterns = router.urls
