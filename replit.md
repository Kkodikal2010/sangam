# Overview

Sangam is an AI-powered matrimonial platform that helps users find compatible life partners through advanced machine learning algorithms. The application analyzes personality traits, values, lifestyle preferences, and compatibility factors to provide meaningful match recommendations. Built as a full-stack web application, it features user authentication, comprehensive profile creation, AI-driven compatibility scoring, and match discovery functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## Migration Completed (January 2025)
- Successfully migrated Sangam matrimonial platform from Replit Agent to Replit environment
- Set up PostgreSQL database with proper schema for users, profiles, matches, and interests
- Fixed all package dependencies and installed required Node.js modules
- Resolved DOM nesting warnings in navigation component
- Application now running successfully on port 5000 with full functionality
- Backend API routes operational with JWT authentication
- Frontend React app with proper routing and UI components working

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring brand colors and responsive design
- **Form Handling**: React Hook Form with Zod schema validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful API structure with middleware for authentication and error handling

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