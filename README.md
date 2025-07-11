# Film Forge 🎬

A sleek movie discovery app that helps you find and save your favorite films.

## Live Demo
[Film Forge App](https://films-forge.netlify.app/)

## Features
- Browse popular, upcoming, and top-rated movies
- Advanced search by title, genre, country, and year
- Save favorites to local storage
- Dark/light theme toggle
- Responsive design for all devices
- Detailed movie information pages

## Technologies Used
- **React** with Vite for fast development
- **Shadcn/ui** components for accessible UI
- **Tailwind CSS** for utility-first styling
- **TMDB API** for movie data
- **React Router** for navigation

## Approach
1. **UI Architecture**:
   - Component-based design with atomic structure
   - Custom hooks for API calls and state management
   - Context API for theme management and favorite films tracking

2. **State Management**:
   - Local state for UI interactions
   - LocalStorage persistence for favorites
   - URL params for search/shareable links

3. **Performance**:
   - Lazy loading of components
   - Skeleton loading states
   - Debounced search inputs

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/yourusername/film-forge.git
```
2. Install dependencies:
```bash
npm install
```
3.Create a .env file and add your TMDB API key:
```js
VITE_API_KEY=your_api_key_here
```
4. Run the development server:
```bash
npm run dev
```
