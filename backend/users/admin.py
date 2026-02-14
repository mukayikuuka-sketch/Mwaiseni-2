from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'first_name', 'last_name', 'user_type', 'city', 'is_verified', 'loyalty_tier', 'is_active']
    list_filter = ['user_type', 'city', 'is_verified', 'loyalty_tier', 'is_active', 'is_staff']
    search_fields = ['email', 'first_name', 'last_name', 'phone', 'id_number']
    ordering = ['-date_joined']
    
    fieldsets = (
        ('🔐 Login Information', {
            'fields': ('email', 'password')
        }),
        ('👤 Personal Information', {
            'fields': ('first_name', 'last_name', 'phone', 'profile_picture')
        }),
        ('📍 Zambian Location', {
            'fields': ('city', 'address'),
            'classes': ('wide',),
            'description': 'Zambian city and address details'
        }),
        ('✅ Verification (Zambia)', {
            'fields': ('is_verified', 'id_number', 'verification_document'),
            'classes': ('collapse',),
            'description': 'National ID/Passport verification for Zambian compliance'
        }),
        ('💎 Loyalty Program', {
            'fields': ('loyalty_points', 'loyalty_tier'),
            'classes': ('collapse',),
            'description': 'Mwaiseni exclusive loyalty rewards'
        }),
        ('⚙️ Permissions', {
            'fields': ('user_type', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('📅 Important Dates', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'phone', 'city', 'user_type', 'password1', 'password2'),
        }),
    )
    
    readonly_fields = ['loyalty_points', 'date_joined', 'last_login']