# Design Guidelines: Professional Blogging Platform

## Design Approach
Reference-based approach inspired by **Medium** and **Ghost** for content-focused blogging with modern, professional aesthetics. The design emphasizes readability, elegant animations, and a distinctive crimson-red brand identity.

## Core Design Principles
- Content-first hierarchy with generous whitespace
- Sophisticated crimson and black palette with strategic accent usage
- Purposeful animations that enhance UX without distraction
- Clean, professional interface that respects the written word

---

## Color System

### Primary Palette
- **Crimson Red**: `#DC143C` - Primary brand color, CTAs, links, accents
- **Deep Black**: `#000000` - Primary text, headers, backgrounds
- **Rich Charcoal**: `#1a1a1a` - Cards, elevated surfaces
- **Soft Gray**: `#f5f5f5` - Page backgrounds, subtle contrasts

### Application Rules
- Use crimson sparingly for maximum impact (CTAs, active states, key headings)
- Black dominates text and structural elements
- Light gray backgrounds provide reading comfort
- Gradients: `linear-gradient(135deg, #DC143C 0%, #8B0000 100%)` for hero sections and premium elements

---

## Typography

### Font Families
- **Headings**: `'Playfair Display', serif` - Elegant, editorial feel
- **Body**: `'Inter', sans-serif` - Clean, highly readable
- **Mono**: `'JetBrains Mono', monospace` - Code snippets

### Type Scale
- Hero Title: `text-5xl lg:text-7xl` (60-72px), `font-bold`
- H1: `text-4xl lg:text-5xl`, `font-bold`
- H2: `text-3xl lg:text-4xl`, `font-semibold`
- H3: `text-2xl lg:text-3xl`, `font-semibold`
- Body: `text-base lg:text-lg` (16-18px), `leading-relaxed`
- Small: `text-sm`, for metadata and captions

---

## Layout System

### Spacing Primitives
Use Tailwind units: **4, 6, 8, 12, 16, 20, 24** (e.g., `p-8`, `my-12`, `gap-6`)

### Container Strategy
- Max-width containers: `max-w-7xl` for full layouts, `max-w-4xl` for blog content
- Consistent section padding: `py-16 lg:py-24`
- Content reading width: `max-w-prose` (65ch) for optimal readability

### Grid Patterns
- Admin dashboard: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Blog list: 2-column masonry-style (`grid-cols-1 lg:grid-cols-2`)
- Single column for blog post content

---

## Component Library

### Navigation
- Fixed header with blur backdrop (`backdrop-blur-md bg-black/90`)
- Logo with crimson accent, clean nav links
- Mobile: Animated slide-in menu from right with overlay
- User profile dropdown in top-right with Google avatar

### Hero Section (Homepage/Dashboard)
- Full-width gradient background (crimson to dark red)
- Large heading with author tagline
- Subtle animated floating particles (CSS keyframes)
- CTA button with glass-morphism effect: `bg-white/10 backdrop-blur-sm border border-white/20`

### Blog Cards
- Clean white/charcoal cards with subtle shadow: `shadow-lg hover:shadow-2xl`
- Featured image with aspect ratio `aspect-video`, subtle zoom on hover
- Title in Playfair Display, excerpt in Inter
- Metadata row: Date, reading time, tags (crimson pill badges)
- Hover: Lift effect with `transform transition-all duration-300`

### Blog Post Page
- Hero image full-width with gradient overlay for title
- Sticky floating "About the Author" sidebar (desktop) or card (mobile)
- Author card: Circular avatar, name, bio, social links with crimson icons
- Content typography with generous line-height (1.8)
- Pull quotes with crimson left border accent

### Forms (Admin Dashboard)
- Rich text editor (TipTap) with crimson accent toolbar
- Input fields: `border-2 border-gray-200 focus:border-crimson` with smooth transitions
- Glass-morphic submit buttons with crimson gradient
- Validation states: Green checkmarks, red error messages

### Authentication Pages
- Centered card layout with gradient background
- Social login buttons: Google (white), Email (crimson), Phone (outlined)
- Smooth fade-in entrance animation

### Dashboard
- Sidebar navigation with icons (Heroicons), crimson active state
- Stats cards with animated count-up on page load
- Post management table with inline actions (edit/delete icons)
- Status badges: Published (green), Draft (gray)

---

## Animation Guidelines

### Purposeful Animations Only
- **Page transitions**: 200ms fade-in on route change
- **Card hover**: Subtle lift + shadow expansion (300ms)
- **Button interactions**: Scale 0.98 on click, smooth background transitions
- **Loading states**: Skeleton screens with shimmer effect (not spinners)
- **Scroll reveals**: Fade-up for blog post elements (Intersection Observer)
- **Hero particles**: Slow floating animation (10-15s duration)

**Avoid**: Excessive parallax, bouncing elements, distracting carousels

---

## Images

### Required Images
1. **Hero Background**: Abstract crimson gradient with subtle texture/noise, 1920x1080px
2. **Author Profile**: Professional headshot, circular crop, 400x400px minimum
3. **Blog Featured Images**: High-quality editorial photos, 16:9 aspect ratio, 1200x675px minimum
4. **Placeholder**: Elegant grayscale pattern for missing images

### Image Treatment
- Overlay gradients on hero images for text legibility
- Rounded corners: `rounded-lg` (8px) for cards, `rounded-full` for avatars
- Lazy loading with blur-up placeholder technique
- Buttons on images: `bg-white/10 backdrop-blur-md` glass effect

---

## Responsive Breakpoints
- Mobile: Base (< 768px) - Stack all layouts, hamburger menu
- Tablet: `md:` (768px+) - 2-column grids, expanded nav
- Desktop: `lg:` (1024px+) - Full layouts, sidebar navigation, 3-column grids

---

## Accessibility
- Crimson-on-white: Ensure AA contrast (4.5:1 minimum)
- Focus states: 2px crimson ring on all interactive elements
- Skip-to-content link for keyboard users
- ARIA labels on icon-only buttons
- Semantic HTML throughout

---

## SEO Elements (Technical, Not Visual)
- Dynamic meta tags per blog post
- Structured data (JSON-LD) for articles
- Open Graph images with author overlay
- XML sitemap generation

This design creates a sophisticated, content-first blogging experience with distinctive crimson branding, purposeful animations, and professional polish throughout every interaction.