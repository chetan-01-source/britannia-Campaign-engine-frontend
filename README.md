# Britannia Campaign Engine

A modern React-based marketing campaign generation and management platform for Britannia products. Create targeted marketing content across multiple platforms with AI-powered branding suggestions.

## Features

- 🚀 **Campaign Generation** - Generate AI-powered marketing campaigns with customizable tones, styles, and platform-specific content
- 📸 **Product Showcase** - Browse Britannia product catalog with lazy-loaded images and skeleton animations
- 🎠 **Interactive Carousel** - Auto-sliding promotional carousel for featured products
- 📱 **Multi-Platform Support** - Generate content optimized for Instagram, LinkedIn, and Email
- 📊 **Campaign History** - View all generated campaigns with infinite scroll pagination
- 🎨 **Platform-Specific Displays** - Unique UI layouts for each social media platform
- 📱 **Responsive Design** - Seamless experience on mobile, tablet, and desktop devices
- 🔍 **Product Search** - Quick search functionality to find products by name

## Tech Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **Intersection Observer API** - For lazy loading and infinite scroll

## Project Structure

```
src/
├── Components/
│   ├── Header/              # Navigation header with search
│   ├── Home/                # Main product listing page
│   ├── ProductGrid/         # Grid layout for products
│   ├── ProductCard/         # Individual product card with lazy loading
│   ├── Carousel/            # Auto-sliding promotional carousel
│   ├── LazyImageHistory/    # Optimized image loading for history
│   ├── CampaignModal/       # Form modal for campaign generation
│   ├── BrandingResult/      # Result display after generation
│   ├── CampaignHistory/     # Campaign history with infinite scroll
│   ├── CampaignPost/        # Platform-specific campaign displays
│   ├── SearchBar/           # Search component
│   ├── Toast/               # Notification system
│   └── LandingPage/         # Landing page
├── services/
│   ├── brandingService.ts   # API calls for campaign generation
│   └── campaignHistoryService.ts # API calls for history pagination
├── interfaces/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main app component
├── App.css                  # App styles
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run ESLint
npm lint
```

## API Integration

The application connects to a backend API for:
- **Campaign Generation**: `POST /api/branding/generate`
- **Campaign History**: `GET /api/campaigns?page=X&limit=Y`

## Key Components

### CampaignModal
Modal form for generating new campaigns with fields for:
- Product name (with auto-complete from product catalog)
- Tone (Youth, Family, Professional, Health, Traditional)
- Platform (Instagram, LinkedIn, Email)
- Style (Minimalist, Vibrant, Premium, Playful)
- Flavor/Context (custom input)

### CampaignHistory
Infinite scroll page displaying all generated campaigns with:
- Platform-specific UI layouts
- Campaign metadata and statistics
- Lazy-loaded images
- Pagination support

### LazyImage Components
Optimized image loading with:
- 1-second delay for skeleton animation
- Intersection Observer for viewport detection
- Shimmer loading effects
- Error handling

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build TypeScript and Vite bundle
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

### Code Style

- ESLint configured for TypeScript and React
- Follows React hooks best practices
- Type-safe component prop interfaces
