"""
?? Mwaiseni PROPERTY SERIALIZERS - PERMANENT FIX
Booking.com level property management system
"""

from rest_framework import serializers
from .models import Property
from django.contrib.auth import get_user_model

User = get_user_model()


class SimpleUserSerializer(serializers.ModelSerializer):
    """Simple user serializer for property listings"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        read_only_fields = fields


class PropertySerializer(serializers.ModelSerializer):
    """Main Property Serializer - Booking.com Level"""
    
    host = SimpleUserSerializer(read_only=True)
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'description', 'property_type', 'price_per_night',
            'bedrooms', 'bathrooms', 'max_guests', 'address', 'city',
            'country', 'latitude', 'longitude', 
            'has_wifi', 'has_parking', 'has_pool', 'has_ac', 'has_kitchen',
            'has_tv', 'has_washer', 'has_breakfast', 'instant_book',
            'average_rating', 'review_count',
            'is_available', 'available_from', 'available_to',
            'host', 'created_at', 'updated_at'
        ]
        read_only_fields = ['average_rating', 'review_count', 'created_at', 'updated_at', 'host']
    
    def create(self, validated_data):
        """Automatically set host to current user"""
        validated_data['host'] = self.context['request'].user
        return super().create(validated_data)


class PropertyListSerializer(serializers.ModelSerializer):
    """Property List View Serializer"""
    
    host_name = serializers.SerializerMethodField()
    amenities = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'property_type', 'city', 'country',
            'price_per_night', 'bedrooms', 'bathrooms',
            'average_rating', 'review_count',
            'has_wifi', 'has_parking', 'has_pool',
            'instant_book', 'host_name', 'amenities',
            'is_available'
        ]
    
    def get_host_name(self, obj):
        """Get host's full name"""
        return f"{obj.host.first_name} {obj.host.last_name}" if obj.host.first_name else obj.host.username
    
    def get_amenities(self, obj):
        """Generate amenities list"""
        amenities = []
        if obj.has_wifi: amenities.append("WiFi")
        if obj.has_parking: amenities.append("Parking")
        if obj.has_pool: amenities.append("Pool")
        if obj.has_ac: amenities.append("AC")
        return ", ".join(amenities)
