# Anime-Next-Watch-Generator
Recommends Anime top trending anime, with filters by genre
# Anime Next Watch Generator

## About The Project
I decided to build this web app because figuring out what anime to watch next usually takes longer than actually watching an episode. [cite_start]The purpose of this project is to give users an easy way to discover new shows[cite: 28]. It fetches top-trending anime and lets you quickly filter through them based on what you're in the mood for.

## API Used
[cite_start]This project uses the **Jikan API** (https://docs.api.jikan.moe)[cite: 28]. [cite_start]It's a really comprehensive public API that pulls data directly from MyAnimeList[cite: 14], which means I can get real-time data on trending shows, genres, and global ratings. [cite_start]All the data is pulled using JavaScript's native `fetch` method[cite: 7, 39].

## Features I Plan to Implement
[cite_start]To make the app interactive, I'm going to include the following features[cite: 28]:
* **Trending Feed:** The homepage will dynamically display a list of currently popular anime.
* **Genre Filter:** Users can narrow down the list of anime by specific genres (like Action, Slice of Life, etc.). [cite_start]This will be handled using array methods like `filter()`[cite: 61].
* [cite_start]**Top Rated Sorting:** A toggle that arranges the current list by highest score, which I'll build using the `sort()` function[cite: 61].
* **Expandable Synopsis:** An interactive card design where clicking on an anime reveals its full plot summary.

## Tech Stack
* **HTML5:** For the basic structure of the pages.
* [cite_start]**CSS3:** For all the styling and making sure the UI looks good on different screen sizes[cite: 9, 42].
* [cite_start]**Vanilla JavaScript:** To handle the API integration, DOM manipulation, and the array higher-order functions required for the logic[cite: 4, 5].

## How to Run It
[cite_start]Setting this up is super simple[cite: 29]:
1. Clone this repository to your computer.
2. Open the project folder.
3. Just double-click the `index.html` file to open it in your browser. 
*(Alternatively, you can open the folder in VS Code and use the "Live Server" extension for a better development experience).*

---
**Author:** Ayush Vijay
