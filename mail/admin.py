from django.contrib import admin

# Register your models here.

from .models import *

class UserAdmin(admin.ModelAdmin):
    pass

class EmailAdmin(admin.ModelAdmin):
    pass



admin.site.register(User, UserAdmin)
admin.site.register(Email, EmailAdmin)