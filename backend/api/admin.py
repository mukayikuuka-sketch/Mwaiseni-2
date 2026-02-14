from django.contrib import admin
from .models import Property, Booking

# Only register Booking here, Property is handled in properties app
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('property', 'guest', 'check_in', 'status')
