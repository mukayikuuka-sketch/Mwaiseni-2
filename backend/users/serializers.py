"""
?? Mwaiseni USER SERIALIZERS - BOOKING.COM LEVEL
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """?? Booking.com Level User Serializer"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'date_joined', 'last_login', 'is_active', 'is_staff']
        read_only_fields = ['date_joined', 'last_login', 'is_active', 'is_staff']


class UserProfileSerializer(serializers.ModelSerializer):
    """User Profile Serializer - Booking.com Level"""
    
    full_name = serializers.SerializerMethodField()
    booking_count = serializers.SerializerMethodField()
    host_properties = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'first_name', 'last_name',
                  'date_joined', 'last_login', 'booking_count', 'host_properties']
        read_only_fields = fields
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def get_booking_count(self, obj):
        try:
            from bookings.models import Booking
            return Booking.objects.filter(user=obj).count()
        except:
            return 0
    
    def get_host_properties(self, obj):
        try:
            from properties.models import Property
            return Property.objects.filter(host=obj).count()
        except:
            return 0


class RegisterSerializer(serializers.ModelSerializer):
    """User Registration - Booking.com Level Security"""
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
    
    def validate(self, attrs):
        """Booking.com level validation"""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields must match"})
        
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email already registered"})
        
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Username already taken"})
        
        return attrs
    
    def create(self, validated_data):
        """Create user with Booking.com level security"""
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
