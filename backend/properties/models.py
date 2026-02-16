from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

class Property(models.Model):
    """Property model for Mwaiseni - Booking.com level"""
    
    # Property Types for Zambia
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('lodge', 'Lodge'),
        ('guesthouse', 'Guest House'),
        ('hotel', 'Hotel'),
        ('hostel', 'Hostel'),
        ('cabin', 'Cabin'),
        ('villa', 'Villa'),
        ('cottage', 'Cottage'),
    ]
    
    # Zambian Cities
    ZAMBIAN_CITIES = [
        ('lusaka', 'Lusaka'),
        ('livingstone', 'Livingstone (Victoria Falls)'),
        ('ndola', 'Ndola'),
        ('kitwe', 'Kitwe'),
        ('chipata', 'Chipata'),
        ('kabwe', 'Kabwe'),
        ('mongu', 'Mongu'),
        ('solwezi', 'Solwezi'),
        ('mazabuka', 'Mazabuka'),
    ]
    
    # Basic Info
    # FIXED: Changed from 'properties' to 'owned_properties' to avoid clash
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_properties')
    title = models.CharField(max_length=200)
    description = models.TextField()
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    
    # Location
    address = models.TextField()
    city = models.CharField(max_length=50, choices=ZAMBIAN_CITIES)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Pricing (in ZMW - Zambian Kwacha)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='ZMW')
    cleaning_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Capacity
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    max_guests = models.PositiveIntegerField()
    
    # Amenities
    has_wifi = models.BooleanField(default=False)
    has_pool = models.BooleanField(default=False)
    has_kitchen = models.BooleanField(default=False)
    has_parking = models.BooleanField(default=False)
    has_ac = models.BooleanField(default=False)
    
    # Availability
    is_available = models.BooleanField(default=True)
    instant_book = models.BooleanField(default=False)
    
    # Ratings
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0, 
                                        validators=[MinValueValidator(0), MaxValueValidator(5)])
    review_count = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.get_city_display()}"
    
    class Meta:
        verbose_name_plural = "Properties"
        ordering = ['-created_at']