from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'host', 'city', 'property_type', 'price_per_night', 'is_available')
    list_filter = ('city', 'property_type', 'is_available', 'has_wifi', 'has_parking')
    search_fields = ('title', 'description', 'address', 'host__email')
    readonly_fields = ('created_at', 'updated_at', 'average_rating', 'review_count')
    fieldsets = (
        ('Basic Information', {
            'fields': ('host', 'title', 'description', 'property_type')
        }),
        ('Location', {
            'fields': ('address', 'city', 'latitude', 'longitude')
        }),
        ('Pricing', {
            'fields': ('price_per_night', 'currency', 'cleaning_fee')
        }),
        ('Capacity', {
            'fields': ('bedrooms', 'bathrooms', 'max_guests')
        }),
        ('Amenities', {
            'fields': ('has_wifi', 'has_pool', 'has_kitchen', 'has_parking', 'has_ac')
        }),
        ('Availability', {
            'fields': ('is_available', 'instant_book')
        }),
        ('Statistics', {
            'fields': ('average_rating', 'review_count', 'created_at', 'updated_at')
        }),
    )
