# NYAYA MITRA AI - AI-Powered Legal Assistant Platform

## Overview

NYAYA MITRA AI is India's premier AI-powered legal assistant platform designed to provide accessible legal guidance to Indian citizens. The platform combines government portal trustworthiness with modern AI design to deliver 24/7 legal assistance in multiple Indian languages. It features comprehensive legal rights information, AI-powered chatbot support, document verification, and free legal aid directory services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS for utility-first styling
- Shadcn/ui component library built on Radix UI primitives

**Design System:**
- Custom color palette with HSL-based theming supporting light/dark modes
- Purple-blue gradient brand identity (Primary: `hsl(270 85% 60%)`, Secondary: `hsl(240 75% 55%)`)
- Animated mesh background using CSS animations for visual appeal
- Typography using Inter/Plus Jakarta Sans for body text, with JetBrains Mono for legal references
- Responsive grid layouts with mobile-first approach
- Custom elevation system using CSS variables for hover/active states

**Component Architecture:**
- Atomic design pattern with reusable UI components in `/components/ui`
- Feature-based components for major sections (Hero, ChatbotWindow, RightsModal, etc.)
- Modal-based navigation for detailed content views
- Sticky header with hamburger menu navigation
- Fixed-position chatbot interface independent of page scrolling

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for type-safe server development
- ESM module system for modern JavaScript syntax
- Custom middleware for request logging and error handling
- Session-based architecture foundation (currently in-memory storage)

**API Design:**
- RESTful endpoints under `/api` namespace
- JSON request/response format
- Centralized error handling with custom error messages
- Request/response logging with timing metrics

**AI Integration:**
- Dual AI provider architecture for redundancy:
  - OpenAI GPT for primary chatbot responses
  - Google Gemini as fallback/alternative provider
- Multilingual support for 11 Indian languages (English, Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati, Odia, Malayalam, Punjabi)
- Document verification using AI vision capabilities
- Legal knowledge base prompting with Indian law specificity (Constitution, IPC, CrPC)

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using Map data structures for user data
- Stateless session management suitable for development/MVP

**Database Schema (Drizzle ORM):**
- PostgreSQL-compatible schema definition
- Users table with UUID primary keys, username/password fields
- Zod schema validation for type safety
- Migration-based schema management via Drizzle Kit

**Future Production Architecture:**
- Neon serverless PostgreSQL configured but not actively used
- Connection pooling ready via `@neondatabase/serverless`
- Environment-based database URL configuration
- Session persistence available via `connect-pg-simple`

### External Dependencies

**AI Services:**
- **OpenAI API**: Primary chatbot intelligence, requires `OPENAI_API_KEY` environment variable
- **Google Gemini AI**: Alternative/fallback AI provider, requires `GEMINI_API_KEY` environment variable

**Database Services:**
- **Neon Serverless PostgreSQL**: Cloud database service configured for production use via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe database operations with PostgreSQL dialect

**Third-Party Libraries:**
- **Radix UI**: Accessible component primitives for dialogs, dropdowns, navigation, forms
- **TanStack Query**: Server state management with caching and refetching strategies
- **Multer**: File upload handling for document verification (10MB limit)
- **React Hook Form + Zod**: Form validation with schema-based validation

**Development Tools:**
- **Vite Plugins**: 
  - Runtime error modal overlay for development
  - Cartographer for code navigation (Replit-specific)
  - Development banner (Replit-specific)
- **TypeScript**: Strict type checking with path aliases for clean imports
- **ESBuild**: Production bundling for server code

**Design Resources:**
- **Google Fonts**: Inter, Plus Jakarta Sans, JetBrains Mono font families
- **Tailwind CSS**: Utility-first styling with custom configuration
- **PostCSS + Autoprefixer**: CSS processing and browser compatibility

**Authentication & Session:**
- Session management foundation using `express-session` architecture
- `connect-pg-simple` for PostgreSQL session storage (configured but not active)
- UUID-based user identification via `crypto.randomUUID()`

**Legal Data:**
- District Legal Services Authority (DLSA) contact information for Karnataka districts
- Comprehensive Indian legal rights database (100+ rights across Constitutional, Criminal, Civil, Family, Consumer, Labour categories)
- Emergency legal contact numbers (Police: 100, Legal Aid: 15100, Women Helpline: 181)