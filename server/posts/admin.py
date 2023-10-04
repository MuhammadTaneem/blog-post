from django.contrib import admin
from .models import Post, Comment, PostImage


# Register your models here.
class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 0


class PostCommentInline(admin.TabularInline):
    model = Comment
    extra = 0


class PostInline(admin.ModelAdmin):
    list_display = ('category', 'location')
    inlines = [PostImageInline, PostCommentInline]

    # class question_model_admin(admin.ModelAdmin):
    #     list_display = ('question', 'created_at')
    #     fieldsets = [
    #         (None, {'fields': ['question']})
    #     ]
    #     inlines = [choiceInline]
    #


admin.site.register(Post, PostInline)

# admin.site.register(Comment)