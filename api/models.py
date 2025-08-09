from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    last_login_at = models.DateTimeField(blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

class Profile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    
    VERIFICATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    age = models.PositiveIntegerField(validators=[MinValueValidator(18), MaxValueValidator(100)])
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    religion = models.CharField(max_length=50, blank=True, null=True)
    caste = models.CharField(max_length=50, blank=True, null=True)
    mother_tongue = models.CharField(max_length=50, blank=True, null=True)
    height = models.PositiveIntegerField(help_text="Height in cm", blank=True, null=True)
    weight = models.PositiveIntegerField(help_text="Weight in kg", blank=True, null=True)
    education = models.TextField(blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    income = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    photos = models.JSONField(default=list, blank=True)
    interests = models.JSONField(default=list, blank=True)
    values = models.JSONField(default=list, blank=True)
    lifestyle = models.JSONField(default=dict, blank=True)
    personality_traits = models.JSONField(default=dict, blank=True)
    partner_preferences = models.JSONField(default=dict, blank=True)
    profile_completeness = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    is_active = models.BooleanField(default=True)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.age}y"

class Match(models.Model):
    STATUS_CHOICES = [
        ('suggested', 'Suggested'),
        ('interested', 'Interested'),
        ('mutual', 'Mutual'),
        ('passed', 'Passed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches')
    matched_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matched_with')
    compatibility_score = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    score_breakdown = models.JSONField(default=dict, blank=True)
    ai_insights = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='suggested')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'matched_user']
    
    def __str__(self):
        return f"{self.user.first_name} -> {self.matched_user.first_name} ({self.compatibility_score}%)"

class Interest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_interests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_interests')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['from_user', 'to_user']
    
    def __str__(self):
        return f"{self.from_user.first_name} -> {self.to_user.first_name} ({self.status})"
