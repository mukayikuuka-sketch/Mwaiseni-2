"""
🏆 ELITE USER SERIALIZER - ZAMSTAY GOLD STANDARD
World-class user management for the world's best booking platform
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class EliteUserSerializer(serializers.ModelSerializer):
    """Gold Standard User Serializer - Booking.com Level Excellence"""
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'password2']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
    
    def validate(self, attrs):
        """World-class validation"""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields must match"})
        return attrs
    
    def create(self, validated_data):
        """Create elite user with enhanced security"""
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
    
    def to_representation(self, instance):
        """Premium representation"""
        data = super().to_representation(instance)
        data['full_name'] = f"{instance.first_name} {instance.last_name}"
        data['is_active'] = instance.is_active
        data['date_joined'] = instance.date_joined
        return data


class PremiumUserProfileSerializer(serializers.ModelSerializer):
    """Premium User Profile for Zamstay Elite"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'date_joined', 'last_login', 'is_active', 'is_staff']
        read_only_fields = ['date_joined', 'last_login', 'is_active', 'is_staff']


class CompactUserSerializer(serializers.ModelSerializer):
    """Compact User Serializer for property listings"""
    
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email']
        read_only_fields = fields
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
