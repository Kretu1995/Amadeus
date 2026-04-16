# Amadeus Restaurant - Image Assets Guide

This directory contains visual assets for the premium dark-themed Amadeus ribs restaurant website.

## Current Assets

- **logo/amadeus-logo.svg** - Elegant serif logo (AMADEUS text) in warm gold (#d4952b) gradient. SVG format for scalability.

## Required Image Assets

Create the following directories and add high-quality images:

### Hero Images (`/hero/`)
- **ribs-hero-1.jpg** - High-resolution hero background image featuring beautifully plated ribs in warm lighting. Dimensions: 1920x1080px minimum. Should convey premium quality, warmth, and appetite appeal.
  - Used in: Hero section, group dining CTA, reservation banner, page hero component
  - Art Direction: Professional food photography, dramatic warm lighting (golden/amber tones), dark/moody atmosphere, ribs as focal point

### Menu Item Images (`/menu/`)
- **spareribs-classic.jpg** - Showcase image for classic spareribs dish. Dimensions: 600x400px. Professional food photography with warm, appetizing presentation.
- Additional menu items as needed based on menu offerings

### Location Images (`/locations/`)

#### Gent Location 1
- **gent-1-hero.jpg** - Hero/exterior image for location. 1200x600px minimum.
- **gent-1-interior-1.jpg** - Interior ambiance shot 1. 800x600px.
- **gent-1-interior-2.jpg** - Interior ambiance shot 2. 800x600px.
- **gent-1-interior-3.jpg** - Interior ambiance shot 3. 800x600px.

#### Gent Location 2
- **gent-2-hero.jpg** - Hero/exterior image for location. 1200x600px minimum.
- **gent-2-interior-1.jpg** - Interior ambiance shot 1. 800x600px.
- **gent-2-interior-2.jpg** - Interior ambiance shot 2. 800x600px.
- **gent-2-interior-3.jpg** - Interior ambiance shot 3. 800x600px.

#### Brussel Location
- **brussel-hero.jpg** - Hero/exterior image. 1200x600px minimum.
- **brussel-interior-1.jpg** - Interior ambiance shot 1. 800x600px.
- **brussel-interior-2.jpg** - Interior ambiance shot 2. 800x600px.

#### Antwerpen Location
- **antwerpen-hero.jpg** - Hero/exterior image. 1200x600px minimum.
- **antwerpen-interior-1.jpg** - Interior ambiance shot 1. 800x600px.
- **antwerpen-interior-2.jpg** - Interior ambiance shot 2. 800x600px.

#### Lozer Location
- **lozer-hero.jpg** - Hero/exterior image. 1200x600px minimum.
- (Additional interior images as needed)

## Image Style Guidelines

### Overall Aesthetic
- **Theme**: Premium dark-themed restaurant
- **Color Palette**: Warm golds (#d4952b, #e8b84a), deep blacks, warm browns, amber lighting
- **Mood**: Sophisticated, intimate, high-end, warm yet moody

### Photography Guidelines
- **Food Photography**: Professional lighting with warm tones, dark backgrounds, focus on texture and appetizing presentation
- **Location Photography**: Interior ambiance that emphasizes warmth, sophistication, intimate dining atmosphere
- **Lighting**: Golden hour or artificial warm lighting (3000-4000K color temperature)
- **Contrast**: Dark backgrounds with golden/warm highlights to match brand aesthetic

### Technical Specifications
- **Format**: JPEG for photographs (high quality)
- **Color Profile**: sRGB for web compatibility
- **Optimization**: Compressed for web (80-90% quality) to balance quality and load time
- **Responsive**: Consider landscape orientation for hero images

## Implementation Notes

1. All images reference `.jpg` extension in the codebase
2. The logo is the only SVG asset currently implemented
3. Consider implementing NextJS `<Image>` component for optimized loading
4. Add placeholder images or low-quality versions during development if real assets aren't ready yet
5. Ensure images are accessible with proper alt text in components

## Placeholder Strategy

For development without real photography:
- Use gradient backgrounds matching the brand color scheme
- Implement SVG placeholders with warm gold tones
- Add temporary text labels indicating image purpose
- Plan photography/sourcing before production deployment
