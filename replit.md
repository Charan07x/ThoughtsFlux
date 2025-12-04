# ThoughtsFlux - Professional Blogging Platform

## Overview
A full-stack blogging platform with a stunning crimson red and black design. Features admin authentication via Replit Auth (Google, email, phone), complete CRUD operations for blog posts, and an About the Author section displayed on every blog post.

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React with Vite, Wouter for routing
- **Styling**: Tailwind CSS with custom crimson/black theme
- **UI Components**: Shadcn UI library
- **State Management**: TanStack Query for server state
- **Animations**: Custom CSS animations with stagger effects

### Backend (Express + TypeScript)
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect) with session management
- **API**: RESTful endpoints for blog posts and author profile

## Key Features
1. **Admin Authentication** - Sign in with Google, email, or phone via Replit Auth
2. **Blog CRUD** - Create, read, update, delete blog posts
3. **Author Profile** - Customizable author card displayed on all posts
4. **Dark/Light Mode** - Theme toggle with system preference detection
5. **SEO Optimization** - Meta tags, Open Graph support, semantic HTML
6. **Responsive Design** - Mobile-first with beautiful animations

## File Structure
```
client/src/
├── components/          # Reusable UI components
│   ├── AnimatedHero.tsx # Hero section with floating particles
│   ├── AuthorCard.tsx   # Author profile card
│   ├── BlogCard.tsx     # Blog post card for listings
│   ├── Navigation.tsx   # Main navigation with mobile menu
│   ├── Skeleton.tsx     # Loading skeleton components
│   ├── ThemeProvider.tsx# Dark/light mode provider
│   └── ThemeToggle.tsx  # Theme toggle button
├── hooks/
│   └── useAuth.ts       # Authentication hook
├── lib/
│   ├── authUtils.ts     # Auth helper utilities
│   └── queryClient.ts   # TanStack Query client config
├── pages/
│   ├── Landing.tsx      # Public landing page
│   ├── Blog.tsx         # Blog listing page
│   ├── BlogPost.tsx     # Individual blog post view
│   ├── Dashboard.tsx    # Admin dashboard
│   ├── BlogEditor.tsx   # Create/edit blog posts
│   └── AuthorProfile.tsx# Edit author profile
└── App.tsx              # Main app with routing

server/
├── db.ts               # Database connection
├── replitAuth.ts       # Replit Auth setup
├── routes.ts           # API endpoints
├── storage.ts          # Database operations
└── index.ts            # Express server setup

shared/
└── schema.ts           # Database schema & types
```

## API Endpoints

### Public
- `GET /api/posts/published` - Get all published posts
- `GET /api/posts/slug/:slug` - Get post by slug
- `GET /api/author` - Get author profile

### Protected (requires authentication)
- `GET /api/auth/user` - Get current user
- `GET /api/posts` - Get all posts (including drafts)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `PATCH /api/posts/:id` - Toggle publish status
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/author` - Update author profile

## Database Schema

### Tables
1. **sessions** - Session storage for auth
2. **users** - User accounts (synced from Replit Auth)
3. **author_profile** - Admin's public profile
4. **blog_posts** - Blog post content

## User Preferences
- Dark mode enabled by default
- Crimson red (#DC143C) as primary brand color
- Inter font for body, Playfair Display for headings
- Smooth animations with stagger effects

## Running the Project
The application runs via `npm run dev` which starts:
- Express server on port 5000 (API + static files)
- Vite dev server for hot module replacement

## Recent Changes
- Initial build: Full-stack blogging platform with crimson theme
- Replit Auth integration for admin authentication
- PostgreSQL database with Drizzle ORM
- Complete CRUD for blog posts
- Author profile management
- Dark/light mode toggle
- Responsive design with animations
