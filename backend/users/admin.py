from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    # User
    User,
    # Property models
    Property, RoomType, Availability,
    # Booking models
    Booking,
    # Payment models
    Payment, Payout,
    # Review models
    Review,
    # Messaging models
    Conversation, Message
)

# ============================================
# USER ADMIN (Your existing beautiful config)
# ============================================
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


# ============================================
# PROPERTY ADMIN
# ============================================
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'city', 'owner', 'price_per_night', 'is_available', 'created_at']
    list_filter = ['city', 'is_available', 'property_type', 'has_wifi', 'has_pool', 'has_parking']
    search_fields = ['title', 'description', 'owner__email', 'address']
    readonly_fields = ['created_at', 'updated_at', 'average_rating', 'review_count']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('owner', 'title', 'property_type', 'description')
        }),
        ('Location', {
            'fields': ('city', 'address')
        }),
        ('Capacity', {
            'fields': ('bedrooms', 'bathrooms', 'max_guests')
        }),
        ('Pricing', {
            'fields': ('price_per_night',)
        }),
        ('Amenities', {
            'fields': ('has_wifi', 'has_pool', 'has_parking', 'has_ac', 'has_kitchen')
        }),
        ('Availability', {
            'fields': ('is_available', 'instant_book')
        }),
        ('Statistics', {
            'fields': ('average_rating', 'review_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'property', 'price_per_night', 'capacity', 'total_rooms']
    list_filter = ['property__city']
    search_fields = ['name', 'property__title']


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ['room_type', 'date', 'available_rooms', 'price_override']
    list_filter = ['date', 'room_type__property__city']
    date_hierarchy = 'date'
    search_fields = ['room_type__name', 'room_type__property__title']


# ============================================
# BOOKING ADMIN
# ============================================
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'property', 'guest', 'check_in', 'check_out', 'total_price', 'status']
    list_filter = ['status', 'check_in', 'check_out']
    search_fields = ['property__title', 'guest__email', 'guest__first_name']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'check_in'
    
    fieldsets = (
        ('Booking Details', {
            'fields': ('property', 'guest', 'status')
        }),
        ('Dates', {
            'fields': ('check_in', 'check_out', 'guests')
        }),
        ('Pricing', {
            'fields': ('total_price',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


# ============================================
# PAYMENT ADMIN
# ============================================
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking', 'amount', 'status', 'payment_method', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['booking__id', 'transaction_id']
    readonly_fields = ['created_at']


@admin.register(Payout)
class PayoutAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'status', 'created_at', 'processed_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__email', 'user__first_name']
    readonly_fields = ['created_at']


# ============================================
# REVIEW ADMIN
# ============================================
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['booking__property__title', 'booking__guest__email', 'comment']
    readonly_fields = ['created_at']


# ============================================
# MESSAGING ADMIN
# ============================================
class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    readonly_fields = ['created_at']


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at', 'updated_at']
    filter_horizontal = ['participants']
    inlines = [MessageInline]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'sender', 'conversation', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['sender__email', 'content']
    readonly_fields = ['created_at']