from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    
    # Profile
    path('profile/', views.user_profile, name='user_profile'),
    path('profile/update/', views.update_profile, name='update_profile'),
    
    # Matches and Search
    path('matches/', views.get_matches, name='get_matches'),
    path('search/', views.search_profiles, name='search_profiles'),
]