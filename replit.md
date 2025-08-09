# Overview

Sangam is an AI-powered matrimonial platform that helps users find compatible life partners through advanced machine learning algorithms. The application analyzes personality traits, values, lifestyle preferences, and compatibility factors to provide meaningful match recommendations. Built as a full-stack web application, it features user authentication, comprehensive profile creation, AI-driven compatibility scoring, and match discovery functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## Backend Migration to Django (January 2025)
- **COMPLETED**: Full backend migration from Express.js/Node.js to Python/Django REST Framework
- **COMPLETED**: Created Django models for User, Profile, Match, Interest with proper PostgreSQL integration
- **COMPLETED**: Set up Django REST API endpoints for authentication, profiles, matches, and search
- **COMPLETED**: Integrated Bootstrap CSS framework into React frontend
- **COMPLETED**: Updated frontend API client to work with Django backend (axios + Token authentication)
- **COMPLETED**: Database migrations and schema setup for Django models
- **COMPLETED**: Django backend connectivity and frontend-backend integration verified
- Django backend running on port 8000, React frontend on port 5000 (via Vite)

## Sangam UI Integration (January 2025)
- **COMPLETED**: Created comprehensive Sangam landing page with Konkani Saraswat community focus
- **COMPLETED**: Built detailed 6-section registration form with all specified fields from UI mapping
- **COMPLETED**: Integrated photo upload (max 10), horoscope file upload, and family information sections
- **COMPLETED**: Added Terms & Conditions page with community-specific disclaimers
- **COMPLETED**: Connected Sangam pages to original design via home page and hero section buttons
- **COMPLETED**: Multi-step form with progress tracking and validation for all required fields
- Features: Personal info, Education, Professional, Social media, Horoscope, Family details

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring brand colors and responsive design
- **Form Handling**: React Hook Form with Zod schema validation

## Backend Architecture
- **Runtime**: Python 3.11 with Django 5.2 framework
- **API Framework**: Django REST Framework for RESTful API design
- **Database ORM**: Django ORM with PostgreSQL backend
- **Authentication**: Token-based authentication (Django Rest Framework Token Auth)
- **API Design**: RESTful API structure with Django views and serializers
- **Security**: Django built-in security features, CORS handling, token-based auth

## Database Design
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Schema Structure**:
  - Users table with authentication credentials and basic info
  - Profiles table with detailed user information, preferences, and AI analysis data
  - Matches table for storing compatibility scores and match status
  - Interests table for tracking user interactions and expressions of interest
- **Data Validation**: Drizzle-Zod integration for runtime schema validation

## AI Integration
- **Provider**: OpenAI GPT models for compatibility analysis
- **Features**:
  - Personality analysis and trait scoring
  - Compatibility calculation across multiple dimensions (values, lifestyle, personality, interests, goals)
  - Profile enhancement suggestions
  - Detailed explanations and insights for match recommendations

## Authentication & Security
- **Session Management**: JWT tokens stored in localStorage
- **Password Security**: Bcrypt hashing with salt rounds
- **API Protection**: Middleware-based route protection for authenticated endpoints
- **Data Validation**: Server-side validation using Zod schemas

## Key Features Architecture
- **Profile Management**: Multi-step profile creation with progress tracking and completeness scoring
- **Match Discovery**: AI-powered recommendation engine with filtering and search capabilities
- **Compatibility Scoring**: Multi-dimensional analysis providing detailed breakdowns and explanations
- **Interest System**: Express interest functionality with messaging capabilities
- **Search & Filters**: Advanced filtering by demographics, preferences, and compatibility criteria

# External Dependencies

## Core Infrastructure
- **Database**: Neon PostgreSQL serverless database
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **Deployment**: Configured for production deployment with static asset serving

## AI Services
- **OpenAI API**: GPT models for compatibility analysis, personality assessment, and profile recommendations
- **AI Features**: Compatibility scoring, personality analysis, match explanations, and profile optimization suggestions

## Authentication & Security
- **JWT**: JSON Web Tokens for stateless authentication
- **bcrypt**: Password hashing and verification
- **Validation**: Zod for runtime type checking and schema validation

## UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: Icon library for consistent iconography
- **Font Awesome**: Additional icons for enhanced visual elements

## Development Tools
- **TypeScript**: Type safety across frontend and backend
- **React Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **PostCSS**: CSS processing with Tailwind and autoprefixer