# Anime Next Watch Generator

[![Live Demo](https://img.shields.io/badge/demo-Vercel-black?style=for-the-badge&logo=vercel)](https://anime-next-watch-generator.vercel.app/)

## About The Project
I decided to build this web app to help discover new anime shows easily. It fetches top-trending anime and lets you actively search or filter through them. The layout has been upgraded to feature a dark Netflix-style user interface built primarily using CSS Grid. 
## API Used
This project uses the public Jikan API. Data is pulled using the native JS fetch method. Real time debounced calls minimize network overhead. Skeleton loaders render asynchronously during data propagation. Rate limiting checks throw explicit error notifications when the endpoint is exhausted.
## Features Implemented
Hero Section showcasing the premier trending show organically.
Grid architecture natively resizing from mobile columns to wide desktop spreads.
Dynamic search inputs routing queries natively through a 300ms debounced interval.
Array Higher Order Functions integrating `map`, `filter`, and `sort` for manipulating and rendering the data. The application strictly adheres to using these instead of traditional Javascript loop structures (`for`, `while`).
Dark Mode / Light Mode Theme Toggle to enhance user experience dynamically, persisting across reloads.
LocalStorage integration persisting favorite toggles and theme settings across distinct browser sessions securely.
Expandable synopsis sections detailing explicit descriptions without disrupting layout containment.
## Tech Stack
HTML5 outlining modular semantics elements.
CSS3 leveraging variables to dictate comprehensive dark and light aesthetics natively.
Vanilla JavaScript orchestrating logic arrays events without external dependencies or framework integrations. 
## How to Run It
Clone this repository locally.
Open the project directory.
Open index.html directly inside any standard web browser.
## Deployment
The application has been refined, cleaned, and is ready for production deployment.
