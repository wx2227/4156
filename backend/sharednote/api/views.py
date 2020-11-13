from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteDynamicSerializer
    queryset = Note.objects.all()


class UpVoteViewSet(viewsets.ModelViewSet):
    serializer_class = UpVoteSerializer
    queryset = UpVote.objects.all()


class DownVoteViewSet(viewsets.ModelViewSet):
    serializer_class = DownVoteSerializer
    queryset = DownVote.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()



