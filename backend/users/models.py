"""
Mwaiseni Professional User Model - Zambian Focused
"""
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """Mwaiseni User - Professional for Zambia"""
    
    # Core Information
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=100)
    last_name = models.CharField(_('last name'), max_length=100)
    
    # User Type
    USER_TYPE_CHOICES = [
        ('guest', 'Guest'),
        ('host', 'Host'),
        ('admin', 'Administrator'),
        ('agent', 'Travel Agent'),
        ('corporate', 'Corporate Client'),
    ]
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='guest')
    
    # Zambian Contact Information
    phone = models.CharField(_('phone number'), max_length=20, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    
    # Zambian Location
    ZAMBIAN_CITIES = [
        ('lusaka', 'Lusaka'),
        ('ndola', 'Ndola'),
        ('kitwe', 'Kitwe'),
        ('livingstone', 'Livingstone'),
        ('kabwe', 'Kabwe'),
        ('chipata', 'Chipata'),
        ('solwezi', 'Solwezi'),
        ('mongu', 'Mongu'),
        ('kasama', 'Kasama'),
        ('other', 'Other City'),
    ]
    
    city = models.CharField(max_length=50, choices=ZAMBIAN_CITIES, default='lusaka')
    address = models.TextField(blank=True)
    
    # Verification (Important for Zambia)
    is_verified = models.BooleanField(default=False)
    id_number = models.CharField(_('National ID/Passport'), max_length=50, blank=True)
    verification_document = models.FileField(upload_to='verification/', blank=True, null=True)
    
    # System Fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)
    
    # Loyalty Program - Mwaiseni Exclusive
    loyalty_points = models.IntegerField(default=0)
    loyalty_tier = models.CharField(max_length=20, choices=[
        ('bronze', 'Bronze'),
        ('silver', 'Silver'),
        ('gold', 'Gold'),
        ('platinum', 'Platinum'),
        ('diamond', 'Diamond'),
    ], default='bronze')
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ['-date_joined']
    
    def __str__(self):
        return f"{self.email} ({self.get_user_type_display()})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def is_zambian(self):
        # Simple check - could be enhanced
        return True  # For Mwaiseni, focus is Zambian market
    
    def get_city_display_name(self):
        return dict(self.ZAMBIAN_CITIES).get(self.city, self.city)
