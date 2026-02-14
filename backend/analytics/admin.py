from django.contrib import admin
from .models import Analytics

@admin.register(Analytics)
class AnalyticsAdmin(admin.ModelAdmin):
    list_display = ['id', 'property', 'date', 'views', 'bookings']
    list_filter = ['date']
    search_fields = ['property__title']
