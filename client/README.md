# DeepScan AI Code Reviewer – Frontend

## Overview

DeepScan AI Code Reviewer Frontend is a modern, responsive web application built with **React** and **Vite**. It provides an intuitive interface for developers to submit code for instant AI-powered reviews, leveraging the backend’s OpenAI and Gemini integrations. The frontend is designed for productivity, learning, and collaboration, making code quality accessible to everyone.

- **Tech Stack:** React 19, Vite, Tailwind CSS, Radix UI, PrismJS, Axios, Lottie, React Markdown
- **License:** MIT (Open Source)
- **Author:** Muhammad Yaseen

---

## Project Structure

```
client/
│   .env
│   .gitignore
│   eslint.config.js
│   index.html
│   package.json
│   README.md
│   vite.config.js
│
├── public/
│   ├── apple-touch-icon.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── vite.svg
│   ├── web-app-manifest-192x192.png
│   ├── web-app-manifest-512x512.png
│   └── assets/
│       ├── Gradient.json
│       ├── Hero Background.png
│       ├── Loading.json
│       ├── Preview.png
│       └── Brand_Assets/
│           └── Text Mark.png
│
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── (images, lottie files, etc.)
    ├── Components/
    │   ├── Footer.jsx
    │   ├── HeroSection.jsx
    │   └── Navbar.jsx
    └── Pages/
        ├── AppReview.jsx
        └── Home.jsx
```

---

## Component & Page Structure

### `src/App.jsx`
- **Purpose:** Main entry point for routing.
- **Imports:** React Router, `Home`, `AppReview`, global CSS.
- **Routes:**
  - `/` → `Home` page
  - `/app/codereview` → `AppReview` page

### `src/Pages/Home.jsx`
- **Purpose:** Landing page.
- **Imports:** `HeroSection`, `Footer`.
- **Features:** Project intro, call-to-action, developer info.

### `src/Pages/AppReview.jsx`
- **Purpose:** Main code review interface.
- **Imports:**
  - `Navbar` (top navigation)
  - `@radix-ui/react-select` (language dropdown)
  - `prismjs` (syntax highlighting)
  - `react-simple-code-editor` (code editor)
  - `axios` (API requests)
  - `react-markdown`, `remark-gfm`, `rehype-highlight` (rendering AI markdown output)
  - `lottie-react` (loading animation)
- **Features:**
  - Paste code, select language, submit for review
  - Shows AI feedback with markdown and syntax highlighting
  - Responsive layout, error alerts

### `src/Components/Navbar.jsx`
- **Purpose:** Top navigation bar with logo and home link.
- **Imports:** React, logo image, React Router.

### `src/Components/HeroSection.jsx`
- **Purpose:** Hero section for landing page.
- **Imports:** Images, logo, preview, React Router.
- **Features:** Project tagline, launch button, developer link.

### `src/Components/Footer.jsx`
- **Purpose:** Footer with project info, navigation, and credits.
- **Imports:** Logo, React Router.
- **Features:** MIT license notice, links to GitHub, LinkedIn, documentation, and contact.

---

## Dependency Breakdown

| Dependency                  | Use Case                                                                                   |
|-----------------------------|-------------------------------------------------------------------------------------------|
| **react**                   | Core UI library                                                                           |
| **react-dom**               | DOM rendering                                                                             |
| **react-router-dom**        | Routing between pages                                                                     |
| **@radix-ui/react-select**  | Accessible, customizable dropdown for language selection                                  |
| **axios**                   | HTTP client for API requests                                                              |
| **prismjs**                 | Syntax highlighting for code editor and markdown output                                   |
| **react-simple-code-editor**| Lightweight code editor component                                                         |
| **react-markdown**          | Render markdown (AI output) as React components                                           |
| **remark-gfm**              | GitHub Flavored Markdown support                                                          |
| **rehype-highlight**        | Syntax highlighting for markdown code blocks                                              |
| **lottie-react**            | Animated loading indicators                                                               |
| **@tailwindcss/vite**       | Tailwind CSS integration for utility-first styling                                        |
| **eslint, plugins**         | Code linting and quality                                                                  |

---

## API Requests & Data Flow

### Backend Base URL

Set in `.env`:
```
VITE_Backend_Base_Url="http://localhost:4000"
```
Used in all API requests via `import.meta.env.VITE_Backend_Base_Url`.

---

### Code Review Request

**Where:** `src/Pages/AppReview.jsx`

**How:**
- User enters code and selects a language.
- On "Send", frontend sends a POST request to the backend.

**Request Example:**
```js
axios.post(`${baseurl}/openai/response/review`, {
  code: input,
  lang: lang
})
```

**Request Body:**
```json
{
  "code": "<user code>",
  "lang": "<selected language>"
}
```

**Response:**
```json
{
  "review": "<AI-generated review in markdown>"
}
```

**Error Handling:**
- If code or language is missing, shows alert.
- If backend is unreachable, shows error alert.

---

### Rendering AI Output

- AI review is rendered using `react-markdown` with `remark-gfm` and `rehype-highlight` for markdown and code block highlighting.
- Editor uses `prismjs` for real-time syntax highlighting.

---

## Styling

- **Tailwind CSS**: Utility-first styling for all components.
- **Custom CSS**: For scrollbar, editor, and markdown output (see `src/index.css`).

---

## How Components Interact

- **App.jsx**: Handles routing.
- **Home.jsx**: Shows `HeroSection` and `Footer`.
- **AppReview.jsx**: Main logic for code input, language selection, API call, and displaying results.
- **Navbar/Footer**: Persistent navigation and credits.
- **HeroSection**: Project intro and quick links.

---

## How to Run

1. Install dependencies:
   ```
   npm install
   ```
2. Set backend URL in `.env` (default: `http://localhost:4000`).
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Credits

All credit goes to **Muhammad Yaseen**.  
This project is open source and published under the MIT License.  
Anyone can use it for learning and productivity.

- **Instagram:** [@yaseenthemernstackdeveloper](https://www.instagram.com/dev_yaseen)
- **LinkedIn:** [Muhammad Yaseen](https://www.linkedin.com/in/yaseenthemernstackdeveloper)
- **WhatsApp:** [Chat on WhatsApp](https://wa.me/923235973947)
- **GitHub:** [View on GitHub](https://github.com/its-myaseen)

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Repository

[GitHub Repository](https://github.com/its-myaseen/DeepScan-Ai-Code-Reviewer)