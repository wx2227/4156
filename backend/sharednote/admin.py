from django.contrib import admin
from .models import User
from .models import Comment
from .models import Note
from .models import UpVote
from .models import DownVote
from .models import Course

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'lion_mail', 'avartar', 'credits')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'note_id', 'content', 'time')


class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_number', 'course_name', 'department_name', 'term')


class NoteAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'course_number', 'file_name', 'file_url', 'description')


class UpVoteAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'note_id')


class DownVoteAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'note_id')


class UploadAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'note_id', 'course_number', 'time')


admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(UpVote, UpVoteAdmin)
admin.site.register(DownVote, DownVoteAdmin)
admin.site.register(Course, CourseAdmin)
