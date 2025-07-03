# DeepScan AI Code Reviewer – Backend

## Overview

DeepScan AI Code Reviewer is an open-source backend service designed to provide instant, AI-powered code reviews and chat-based assistance for developers. It leverages both OpenAI's GPT-4o-mini and Google's Gemini models to analyze code, suggest improvements, and answer programming-related queries. The backend is built with Node.js and Express, providing RESTful APIs for seamless integration with any frontend or client.

- **Tech Stack:** Node.js, Express, OpenAI API, Google Gemini API, Jade (for views), CORS, dotenv
- **License:** MIT (Open Source)
- **Author:** Muhammad Yaseen

---

## Folder Structure

```
backend/
│   .env
│   app.js
│   package.json
│
├── bin/
│   └── www
├── Controller/
│   ├── Gemini.controller.js
│   └── OpenAi.Controller.js
├── public/
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
│       └── style.css
├── routes/
│   ├── Gemini.js
│   ├── index.js
│   ├── OpenAi.js
│   └── users.js
├── Services/
│   ├── GEMINI_review.js
│   ├── OPEN_chat.js
│   └── OPEN_review.js
└── views/
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

---

## How It Works

The backend exposes RESTful endpoints for code review and chat functionalities using two AI providers:

- **OpenAI GPT-4o-mini**: For code review and chat.
- **Google Gemini 2.5 Flash**: For code review.

Each service is modularized in the `Services/` directory, with controllers handling HTTP requests and responses.

---

## API Endpoints

### 1. OpenAI Code Review

- **Endpoint:** `POST /openai/response/review`
- **Description:** Submits source code and language for AI-powered review using OpenAI GPT-4o-mini.
- **Request Body:**
    ```json
    {
      "code": "<source code as string>",
      "lang": "<programming language as string>"
    }
    ```
- **Response:**
    ```json
    {
      "review": "<AI-generated review text>"
    }
    ```
- **Error Response:** (if code or lang missing)
    ```json
    {
      "review": null
    }
    ```
- **Path:** `/openai/response/review`
- **Handler:** [`OpenAi.Controller.js`](Controller/OpenAi.Controller.js) → [`OPEN_review.js`](Services/OPEN_review.js)

#### Flow Diagram

```
Client
  │
  └── POST /openai/response/review
         │
         └── OpenAi.Controller.js
                │
                └── OPEN_review.js (calls OpenAI API)
                        │
                        └── Returns review text
```

---

### 2. OpenAI Chat

- **Endpoint:** `GET /openai/response/chat`
- **Description:** Sends a message to the AI assistant for general programming help or questions.
- **Request Query:**
    ```
    ?message=<your message>
    ```
- **Response:**
    ```json
    {
      "response": "<AI-generated reply>"
    }
    ```
- **Path:** `/openai/response/chat`
- **Handler:** [`OpenAi.Controller.js`](Controller/OpenAi.Controller.js) → [`OPEN_chat.js`](Services/OPEN_chat.js)

#### Flow Diagram

```
Client
  │
  └── GET /openai/response/chat?message=...
         │
         └── OpenAi.Controller.js
                │
                └── OPEN_chat.js (calls OpenAI API)
                        │
                        └── Returns chat response
```

---

### 3. Gemini Code Review

- **Endpoint:** `GET /gemini/response/review`
- **Description:** Submits source code and language for AI-powered review using Google Gemini 2.5 Flash.
- **Request Body:** (should be sent as JSON in the request body)
    ```json
    {
      "code": "<source code as string>",
      "lang": "<programming language as string>"
    }
    ```
- **Response:**
    ```json
    {
      "response": "<AI-generated review text>"
    }
    ```
- **Error Response:** (if code or lang missing)
    ```json
    {
      "error": "code is not provided to review" // or "language is required"
    }
    ```
- **Path:** `/gemini/response/review`
- **Handler:** [`Gemini.controller.js`](Controller/Gemini.controller.js) → [`GEMINI_review.js`](Services/GEMINI_review.js)

#### Flow Diagram

```
Client
  │
  └── GET /gemini/response/review
         │
         └── Gemini.controller.js
                │
                └── GEMINI_review.js (calls Gemini API)
                        │
                        └── Returns review text
```

---

## API Summary Table

| Endpoint                      | Method | Input Body / Query         | Output Field | AI Model         | Description                |
|-------------------------------|--------|----------------------------|--------------|------------------|----------------------------|
| `/openai/response/review`     | POST   | `{ code, lang }`           | `review`     | GPT-4o-mini      | Code review (OpenAI)       |
| `/openai/response/chat`       | GET    | `?message=...`             | `response`   | GPT-4o-mini      | Chat (OpenAI)              |
| `/gemini/response/review`     | GET    | `{ code, lang }` (body)    | `response`   | Gemini 2.5 Flash | Code review (Gemini)       |

---

## Example Requests

### OpenAI Code Review

**Request:**
```http
POST /openai/response/review
Content-Type: application/json

{
  "code": "def add(a, b): return a + b",
  "lang": "python"
}
```
**Response:**
```json
{
  "review": "The code is correct, but you may want to add type hints and error handling for robustness..."
}
```

---

### OpenAI Chat

**Request:**
```http
GET /openai/response/chat?message=How do I reverse a string in JavaScript?
```
**Response:**
```json
{
  "response": "You can reverse a string in JavaScript by splitting it into an array, reversing the array, and joining it back..."
}
```

---

### Gemini Code Review

**Request:**
```http
GET /gemini/response/review
Content-Type: application/json

{
  "code": "function sum(a, b) { return a + b; }",
  "lang": "javascript"
}
```
**Response:**
```json
{
  "response": "The function is correct, but consider adding input validation and documentation..."
}
```

---

## Environment Variables

Set these in your `.env` file:

```
PORT=4000
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
```

---

## Error Handling

- If required fields are missing, the API responds with an error message and appropriate HTTP status.
- Internal errors are logged and a generic error message is returned.

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