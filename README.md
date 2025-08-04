# Sangam - AI-Powered Matrimonial Platform

Sangam is a modern matrimonial platform that combines traditional matchmaking wisdom with cutting-edge AI technology to help people find meaningful, compatible relationships.

## Features

🤖 **AI-Powered Matching**: Advanced personality analysis and compatibility scoring
💕 **Smart Recommendations**: Intelligent match suggestions based on values, lifestyle, and preferences
🔒 **Secure Authentication**: JWT-based auth with Google OAuth integration
📱 **Modern UI**: Responsive design with React and Tailwind CSS
🗄️ **PostgreSQL Database**: Robust data storage with Drizzle ORM
🔍 **Advanced Search**: Filter and search profiles with multiple criteria
💬 **Interest Management**: Express interest and manage connections
📊 **Profile Analytics**: Comprehensive profile completeness tracking

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Wouter** for routing
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Drizzle ORM
- **JWT** authentication
- **bcrypt** for password hashing
- **OpenAI API** for AI-powered features
- **Google OAuth** for social login

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- OpenAI API key
- Google OAuth credentials (optional)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sangam"
PGHOST="localhost"
PGPORT="5432"
PGDATABASE="sangam"
PGUSER="your_username"
PGPASSWORD="your_password"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# OpenAI (Required for AI features)
OPENAI_API_KEY="sk-your-openai-api-key"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:5000/api/auth/google/callback"
```

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sangam.git
cd sangam
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
```bash
# Push the database schema
npm run db:push

# Optional: Inspect your database
npm run db:studio
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate migration files
npm run db:studio        # Open Drizzle Studio

# Type checking
npm run type-check
```

## Project Structure

```
sangam/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── main.tsx       # App entry point
│   └── index.html
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── ai.ts              # AI integration
│   ├── googleAuth.ts      # Google OAuth
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Profile Management
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile

### Matching & Recommendations
- `GET /api/matches` - Get user matches
- `GET /api/recommendations` - Get AI recommendations
- `GET /api/search` - Search profiles

### AI Features
- `GET /api/ai/profile-suggestions` - Get profile improvement suggestions
- `POST /api/ai/compatibility` - Calculate compatibility score

### Interests
- `POST /api/interests` - Express interest
- `GET /api/interests/:type` - Get sent/received interests
- `PUT /api/interests/:id` - Update interest status

## Deployment

### Replit Deployment
1. Connect your GitHub repository to Replit
2. Set environment variables in Replit Secrets
3. The application will auto-deploy on changes

### Manual Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`

## Getting API Keys

### OpenAI API Key
1. Create account at [OpenAI Platform](https://platform.openai.com)
2. Go to API Keys section
3. Create new API key
4. Add to environment variables

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Add credentials to environment variables

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@sangam.com or create an issue on GitHub.