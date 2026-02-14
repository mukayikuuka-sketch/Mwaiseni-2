from rest_framework import serializers
from .models import Property, Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'property', 'check_in', 'check_out', 'total_price', 'status']
        read_only_fields = ['guest', 'status']

    def create(self, validated_data):
        # Automatically assign the logged-in user as the guest
        validated_data['guest'] = self.context['request'].user
        return super().create(validated_data)
