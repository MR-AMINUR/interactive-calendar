# Interactive Wall Calendar

A polished, interactive calendar component built with React + Vite.

## Features
- 📅 Month-specific hero images (Unsplash)
- 🗓 Day range selection with visual states
- 📝 Date-attached notes with localStorage persistence
- 🎉 Indian holiday markers
- 🔄 3D flip animation on month navigation
- 📱 Fully responsive (mobile stacked / desktop side-by-side)

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- date-fns (date utilities)

## Run Locally
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO
cd YOUR_REPO
npm install
npm run dev
```
Open http://localhost:5173

## Design Choices
- **localStorage** for note persistence — no backend needed
- **Framer Motion** for directional 3D month flip
- **Unsplash** month-specific images for wall calendar aesthetic
- **Indian holidays** hardcoded for cultural relevance
- Mobile-first responsive layout using Tailwind grid