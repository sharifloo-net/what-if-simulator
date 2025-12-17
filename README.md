# What If? Simulator

## Overview
A Progressive Web App (PWA) that explores hypothetical "What If?" scenarios and displays their structured consequences of six categories: Daily Life, Economy, Technology, Social Structure, Advantages, and Problems.

## Project Structure
```
/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling with responsive design
├── app.js              # Core JavaScript functionality
├── manifest.json       # PWA manifest for installation
├── service-worker.js   # Offline caching support
└── README.md           # Project documentation
```

## Features
- **8 Pre-loaded Scenarios**: Realistic scenarios with detailed bullet points
- **Custom Scenarios**: Create your own "What If?" scenarios
- **AI Generation**: Optional external LLM integration with fallback generator
- **Favorites**: Mark scenarios as favorites
- **Export/Import**: Save and load scenarios as JSON
- **Keyboard Shortcuts**: Arrow keys to navigate, F to favorite
- **Offline Support**: Full PWA with service worker caching
- **Responsive Design**: Works on desktop and mobile

## Tech Stack
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- LocalStorage for data persistence
- Service Worker for offline capability
- No external dependencies or frameworks

## Running Locally
Simply open `index.html` in a browser or serve via a static server on port 5000.

## PWA/APK Conversion
1. Deploy to HTTPS server
2. Visit https://www.pwabuilder.com/
3. Enter your deployed URL
4. Generate and download APK

## Data Storage
Scenarios stored in localStorage key: `whatif-scenarios-v1`
