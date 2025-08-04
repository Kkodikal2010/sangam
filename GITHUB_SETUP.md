# GitHub Setup and Local Development Guide

This guide will help you push your Sangam project to GitHub and set it up for independent development.

## Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
git init
git add .
git commit -m "Initial commit: Sangam matrimonial platform"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `sangam-matrimonial-platform` (or your preferred name)
5. Description: "AI-powered matrimonial platform with React frontend and Node.js backend"
6. Make it **Public** or **Private** (your choice)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/sangam-matrimonial-platform.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Set Up Local Development Environment

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running locally
- Git installed

### Database Setup

#### Option 1: Local PostgreSQL
1. Install PostgreSQL on your system
2. Create a database named `sangam`:
   ```sql
   CREATE DATABASE sangam;
   ```

#### Option 2: Cloud Database (Recommended)
1. Sign up for a free database at:
   - [Neon](https://neon.tech) (PostgreSQL)
   - [Supabase](https://supabase.com) (PostgreSQL)
   - [PlanetScale](https://planetscale.com) (MySQL - requires schema changes)

### Environment Setup

1. **Clone your repository** (if setting up on a new machine):
   ```bash
   git clone https://github.com/YOUR_USERNAME/sangam-matrimonial-platform.git
   cd sangam-matrimonial-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your actual values:
   ```env
   # Database - Replace with your database URL
   DATABASE_URL="postgresql://username:password@localhost:5432/sangam"
   
   # Generate a secure JWT secret (you can use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   JWT_SECRET="your-super-secure-32-character-secret"
   
   # Get from https://platform.openai.com
   OPENAI_API_KEY="sk-your-openai-api-key"
   
   # Optional: Google OAuth credentials
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

5. **Initialize database**:
   ```bash
   npm run db:push
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:5000` to see your application!

## Step 5: Get Required API Keys

### OpenAI API Key (Required)
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to "API Keys" in the dashboard
4. Click "Create new secret key"
5. Copy the key and add it to your `.env` file

### Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the "Google+ API" and "Google OAuth2 API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (for development)
   - `https://your-domain.com/api/auth/google/callback` (for production)
7. Copy Client ID and Client Secret to your `.env` file

## Step 6: Development Workflow

### Making Changes
```bash
# Create a new branch for your feature
git checkout -b feature/new-feature-name

# Make your changes
# ... edit files ...

# Commit your changes
git add .
git commit -m "Add new feature: description of what you added"

# Push to GitHub
git push origin feature/new-feature-name
```

### Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Database commands
npm run db:push        # Push schema changes
npm run db:studio      # Open database studio
npm run db:generate    # Generate migrations

# Type checking
npm run type-check
```

## Step 7: Deployment Options

### Option 1: Replit (Easiest)
1. Import your GitHub repository to Replit
2. Set environment variables in Replit Secrets
3. Your app will auto-deploy

### Option 2: Vercel (Frontend + Serverless Functions)
1. Connect your GitHub repo to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Option 3: Railway (Full-stack)
1. Connect your GitHub repo to Railway
2. Add environment variables
3. Deploy with built-in PostgreSQL

### Option 4: DigitalOcean App Platform
1. Connect your GitHub repo
2. Configure environment variables
3. Deploy with managed database

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify credentials are correct

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run type-check`
- Ensure environment variables are set

### Port Already in Use
- Kill existing processes: `lsof -ti:5000 | xargs kill -9`
- Or change the port in `server/index.ts`

### Environment Variables Not Working
- Ensure `.env` file is in the root directory
- Restart the development server after changing `.env`
- Check that variable names match exactly

## Useful Resources

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [OpenAI API](https://platform.openai.com/docs)

## Getting Help

- Create GitHub Issues for bugs or feature requests
- Check the console for error messages
- Refer to the main README.md for API documentation

## Project Structure Reference

```
sangam/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Database operations
│   ├── ai.ts              # AI integration
│   └── googleAuth.ts      # OAuth handling
├── shared/                # Shared code
│   └── schema.ts          # Database schema
├── .env                   # Environment variables
├── package.json           # Dependencies
└── README.md              # Main documentation
```

Happy coding! 🚀