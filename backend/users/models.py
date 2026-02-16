from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import uuid

# ============================================
# USER MANAGER
# ============================================
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

# ============================================
# USER MODEL (Your existing beautiful model)
# ============================================
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
    
    def get_city_display_name(self):
        return dict(self.ZAMBIAN_CITIES).get(self.city, self.city)

# ============================================
# PROPERTY MODELS
# ============================================
class Property(models.Model):
    PROPERTY_TYPES = [
        ('lodge', 'Lodge'),
        ('apartment', 'Apartment'),
        ('guesthouse', 'Guesthouse'),
        ('villa', 'Villa'),
        ('cottage', 'Cottage'),
        ('hotel', 'Hotel'),
    ]
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=255)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES, default='apartment')
    description = models.TextField()
    
    # Location
    city = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    
    # Capacity
    bedrooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    max_guests = models.IntegerField(default=2)
    
    # Pricing
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Amenities
    has_wifi = models.BooleanField(default=False)
    has_pool = models.BooleanField(default=False)
    has_parking = models.BooleanField(default=False)
    has_ac = models.BooleanField(default=False)
    has_kitchen = models.BooleanField(default=False)
    
    # Availability
    is_available = models.BooleanField(default=True)
    instant_book = models.BooleanField(default=False)
    
    # Stats
    average_rating = models.FloatField(default=0)
    review_count = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class RoomType(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='room_types')
    name = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.IntegerField()
    total_rooms = models.IntegerField(default=1)
    
    def __str__(self):
        return f"{self.name} - {self.property.title}"

class Availability(models.Model):
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='availabilities')
    date = models.DateField()
    available_rooms = models.IntegerField(default=0)
    price_override = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    class Meta:
        unique_together = ['room_type', 'date']
    
    def __str__(self):
        return f"{self.room_type.name} - {self.date}"

# ============================================
# BOOKING MODELS
# ============================================
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='bookings')
    guest = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Booking {self.id} - {self.property.title}"

# ============================================
# PAYMENT MODELS
# ============================================
class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Payment {self.transaction_id} - {self.amount}"

class Payout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payouts')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    payment_details = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)

# ============================================
# REVIEW MODEL
# ============================================
class Review(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='review')
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review {self.id} - {self.rating}★"

# ============================================
# MESSAGING MODELS
# ============================================
class Conversation(models.Model):
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.sender.email} at {self.created_at}"