from rest_framework import serializers
from sharednote.models import User, Note


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'user_name', 'lion_mail', 'avartar', 'credits')


class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = ('id', 'file_name', 'file_url', 'up_votes', 'down_votes')
