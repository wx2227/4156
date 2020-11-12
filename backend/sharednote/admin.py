from django.contrib import admin
from .models import User
from .models import Comment
from .models import Commented
from .models import Note
from .models import Vote
from .models import Course
from .models import CourseNote
from .models import Upload

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'lion_mail', 'avartar', 'credits')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('content',)


class CommentedAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'comment_id', 'time')


class NoteAdmin(admin.ModelAdmin):
    list_display = ('file_url', 'up_votes', 'down_votes')


class VoteAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'note_id', 'up')


class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_number', 'course_name', 'department_name', 'term')


class CourseNoteAdmin(admin.ModelAdmin):
    list_display = ('course_number', 'note_id')


class UploadAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'note_id', 'course_number', 'time')


admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Commented, CommentedAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Vote, VoteAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(CourseNote, CourseNoteAdmin)
admin.site.register(Upload, UploadAdmin)
