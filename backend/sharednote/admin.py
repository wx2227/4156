"""
define admin page format
"""
from django.contrib import admin
from .models import CustomizeUser
from .models import Comment
from .models import Note
from .models import Course
from .models import Vote

# Register your models here.


admin.site.register(CustomizeUser)
admin.site.register(Comment)
admin.site.register(Note)
admin.site.register(Course)
admin.site.register(Vote)
