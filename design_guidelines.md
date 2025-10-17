# NYAYA MITRA AI - Design Guidelines

## Design Philosophy
Legal-tech platform combining government portal trust with modern AI design. Reference: Stripe (professionalism), Linear (typography), Digital India (accessibility). Balance credibility with innovation for Indian users.

---

## Color System

### Core Palette
- **Primary**: `hsl(270 85% 60%)` Deep Purple - brand/trust
- **Secondary**: `hsl(240 75% 55%)` Royal Blue - accent
- **Success**: `hsl(142 76% 36%)` Document "Real"
- **Error**: `hsl(0 84% 60%)` Document "Fake"
- **Neutral**: `hsl(220 14% 96%)` borders, `hsl(0 0% 98%)` cards

### Gradients
- **Background**: Animated mesh white → `hsl(280 70% 85%)` → `hsl(330 65% 80%)`, 20-30s cycle
- **Accent**: Purple-to-blue for headings/CTAs
- **Cards**: 85-95% opacity white/dark over animated background

---

## Typography

### Fonts
- **Primary**: Inter / Plus Jakarta Sans
- **Headings**: Instrument Sans / Sora
- **Mono**: JetBrains Mono (legal references)

### Scale
- **Hero**: 3.5rem desktop / 2.25rem mobile, weight 700
- **Section**: 2.5rem desktop / 1.875rem mobile, weight 600
- **Card Titles**: 1.5rem, weight 600
- **Body**: 1rem, weight 400, line-height 1.6
- **Legal**: 0.875rem, weight 400, line-height 1.8

---

## Layout

### Spacing (Tailwind units)
- **Component padding**: p-6 to p-8
- **Section spacing**: py-16/py-24 desktop, py-12 mobile
- **Card gaps**: gap-6 to gap-8
- **Chatbot offset**: m-6 from edges

### Grids
- **Legal Guidance**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **District Cards**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- **Rights Modal**: `grid-cols-1 md:grid-cols-2 gap-4`
- **Mobile**: Single column, touch-optimized

---

## Components

### Navigation
- **Header**: Sticky, backdrop-blur, hamburger top-left
- **Menu**: Home, Legal Rights, AI Chat, Law Search, Legal Guidance, Free Legal Aid, Contact, About
- **Mobile**: Slide-in menu, auto-close on nav

### Cards (Primary UI)
```css
/* Base Style */
background: white/dark 90% opacity
border-radius: 16px (rounded-2xl)
border: 1px 10% opacity accent
padding: p-6 to p-8
box-shadow: shadow-lg + custom depth

/* Hover */
transform: translateY(-4px) scale(1.02)
transition: 300ms ease
```

### Legal Guidance Cards
- **Icon**: 48px 3D gradient circle
- **Title**: 1.5rem weight 600
- **Description**: 2-3 lines
- **CTA**: Gradient "Explore More" button
- **Expanded**: Modal with 8-12 detailed points

### District Cards (30 Karnataka)
- **Layout**: Compact, district name + location icon
- **Contact**: tel: phone, secondary mobile, mailto: email
- **Search**: Filter bar for district names

### Document Upload
- **Zone**: Dashed border drag-drop with icon
- **Integration**: Cloudinary auto-optimize
- **Results**: Dual cards (OpenAI + Gemini) side-by-side desktop, stacked mobile
  - Status badge (Real/Fake)
  - Confidence % circular progress
  - 6 factors: Format, Position, Character, Blur, Color, Keywords (✓/✗)
  - Comparison % below cards

### Rights Modal
- **Size**: Full-screen mobile, 90vw max-w-6xl desktop
- **Search**: Fixed top, instant filter
- **Filters**: Category pills (Constitutional, Criminal, Civil, Family, Procedural)
- **Cards**: Icon + badge + 5-star + explanation
- **Trigger**: "View All 100 Rights" button

### Chatbot - NYAYA MITRA AI
```css
/* Position */
position: fixed; bottom: 24px; right: 24px; (m-6)

/* Icon */
transparent robot head, 64px (no blue background)

/* Window */
width: 540px; height: 720px; (full-screen mobile)

/* Features */
- Header: Language selector (11 languages native scripts), minimize/close
- Messages: Independent scroll, persists until cleared
- Input: Text + voice mic + send
- Per message: Copy (toast confirm) + Share (readonly link)
- Rating: 1-5 stars + optional feedback after response
```

---

## 3D Background Animation

### Elements
- **Gradient Mesh**: SVG/CSS 20-30s smooth cycle
- **Floating Shapes**: 11-20 geometric objects
  - 3D rotation CSS transform
  - Slow drift, 20-40% opacity, blur depth
- **Gradient Orbs**: 3-5 pulsing circles
- **Performance**: GPU-accelerated, reduced motion mobile, 60fps target

---

## Interactions & Animations

### Micro-interactions
- **Buttons**: Hover scale 1.05 + shadow + gradient shift
- **Cards**: 3D lift 300ms transition
- **Inputs**: Focus border + glow
- **Actions**: Toast bottom-center 3s

### Transitions
- **Modal**: Fade + scale center, 200ms ease-out
- **Menu**: 300ms ease-in-out left slide
- **Chat**: Fade-in bottom, 150ms stagger
- **Voice**: Pulsing mic + wave animation during recording

---

## Hero Section
- **Headline**: "India's Premier AI Legal Assistant" - gradient 3.5rem
- **Subhead**: "Get instant legal guidance in your language, 24/7" - 1.25rem
- **Badges**: 24/7 Support | 11 Languages | 100% Confidential | AI-Powered
- **CTAs**: Primary "Start Chat" (gradient) + Secondary "View Legal Rights" (outline blur backdrop)
- **Below Fold**: 4-col feature grid with icons

---

## Accessibility & Responsive

### Dark Mode
- All components including forms
- Toggle in nav, localStorage persist
- WCAG AA contrast minimum

### Mobile
- Touch targets: 44×44px min
- Chat: Full-screen, swipe-to-close
- Menu: Slide-in with backdrop
- Cards: Single column stack
- **Critical**: Independent chat scroll for zoom users

### Performance
- Lazy load modal content
- Battery-optimized animations
- Cloudinary auto-optimize
- API response caching

---

## Footer

### Reviews
- **Empty**: "Be First to Review" CTA
- **Populated**: 3-col grid (1 mobile) - stars, text, name, date
- **Average**: Prominent display above reviews

### Contact
- **Emergency Card**: Police 100, Legal Aid 15100, Women 181 (icon + number + description)
- **Support**: Email, Karnataka India, hours
- **Quick Links**: Nav shortcuts

---

## Production Requirements

### Error Handling
- User-friendly API failure messages
- Fallback UI for loading/errors
- Network retry options

### Persistence
- Chat history: localStorage until cleared
- Saved: Language, dark mode, reviews

### Functional Buttons
- All buttons perform tasks without errors
- Loading states during API calls
- Confirmation dialogs where needed
- Back buttons throughout

---

**Token Budget**: ~1,850 tokens | All critical design specs, code examples, accessibility rules, color/typography, and implementation details preserved for production-ready frontend development.