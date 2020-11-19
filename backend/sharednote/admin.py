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


class CustomizeUserAdmin(admin.ModelAdmin):
    """
    define customize user format in admin page
    """
    list_display = ('avartar', 'credits', 'user')


class CommentAdmin(admin.ModelAdmin):
    """
    define comment format in admin page
    """
    list_display = ('user_id', 'note_id', 'content', 'time')


class CourseAdmin(admin.ModelAdmin):
    """
    define course format in admin page
    """
    list_display = ('course_number', 'course_name', 'department_name', 'term')


class NoteAdmin(admin.ModelAdmin):
    """
    define note format in admin page
    """
    list_display = ('user_id', 'course_number', 'file_name', 'file_url', 'description', 'time')


class VoteAdmin(admin.ModelAdmin):
    """
    define vote format in admin page
    """
    list_display = ('user_id', 'note_id', 'vote')


admin.site.register(CustomizeUser, CustomizeUserAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Vote, VoteAdmin)
