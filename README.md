# Maths Chapter 1 Educational Web App

This web application provides interactive learning content for Mathematics Chapter 1.

## Features

*   Chapter overview and topic navigation
*   Individual topic pages with explanations and exercises
*   Interactive exercises (fill-in-the-blanks) with immediate feedback
*   Gamification: Points system and achievement badges
*   Progress tracking using Local Storage
*   Responsive design for desktop and mobile

## Project Structure

```
New-Site/
├── index.html             # Homepage
├── 404.html               # Not Found page
├── server.js              # Simple Node.js web server
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Main script for homepage, navigation, progress
│   ├── topics.js          # Logic for topic pages, exercises
│   ├── storage.js         # Local storage interaction functions
│   ├── gamification.js    # Gamification logic (points, badges)
│   └── data.js            # Local data (chapter structure, topics, exercises)
├── topics/
│   ├── topic1.html        # Example topic page 1
│   ├── topic2.html        # Example topic page 2
│   ├── topic3.html        # Example topic page 3
│   ├── topic4.html        # Example topic page 4
│   ├── topic5.html        # Example topic page 5
│   ├── topic6.html        # Example topic page 6
│   ├── topic7.html        # Example topic page 7
│   ├── topic8.html        # Example topic page 8
│   └── topic9.html        # Example topic page 9
│   └── ...                # More topic pages
├── assets/
│   └── images/            # Images, badges, etc.
│       └── badge_placeholder.png
└── README.md
```

## Setup and Usage

1.  **Prerequisites:** Make sure you have [Node.js](https://nodejs.org/) installed on your system.
2.  **Clone/Download:** Clone or download this repository to your local machine.
3.  **Navigate:** Open a terminal or command prompt and navigate to the `New-Site` directory.
4.  **Run Server:** Execute the command: `node server.js`
5.  **Access App:** Open your web browser and go to `http://localhost:3000`.
6.  The application uses the browser's Local Storage, so no database setup is needed.

## How it Works

*   The `server.js` file starts a basic HTTP server using Node.js to serve the static HTML, CSS, JS, and image files.
*   Content and structure are defined in `js/data.js`.
*   User progress (points, completed topics, badges) is saved in the browser's Local Storage via `js/storage.js`.
*   `js/main.js` handles the homepage display and initialization.
*   `js/topics.js` manages the interactions on individual topic pages.
*   `js/gamification.js` calculates points and awards badges.
*   Styling and responsiveness are handled by `css/style.css`.
