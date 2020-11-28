"""
define admin page format
"""
from django.contrib import admin
from .models import CustomizeUser, Comment, Note, Course, Vote, Favorite

# Register your models here.


admin.site.register(CustomizeUser)
admin.site.register(Comment)
admin.site.register(Note)
admin.site.register(Course)
admin.site.register(Vote)
admin.site.register(Favorite)
