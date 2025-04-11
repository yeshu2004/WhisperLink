# WhisperLink

![WhisperLink Logo](https://via.placeholder.com/150.png?text=WhisperLink)  
*Drop questions in the shadows, answer in the light.*

**WhisperLink** is a sleek, anonymous Q&A platform built with the MERN stack. Creators craft shareable links (e.g., `whisperlink.com/username`), invite anonymous questions, and respond publicly or privately—all while keeping the experience fun, safe, and toxic-free. Whether it’s spilling secrets or sparking curiosity, WhisperLink connects people through the power of anonymity.

---

## Features

- **Anonymous Questions**: Askers drop questions without a trace—no accounts, no tracking.
- **Creator Control**: Sign up, log in, and manage your Q&A links with ease.
- **Shareable Links**: One-click URLs perfect for Instagram, TikTok, or anywhere.
- **Safe Space**: Powered by moderation (Gemini API coming soon) to filter out toxicity.
- **Timestamps**: Every action logged with `createdAt` and `updatedAt` for clarity.

*Coming Soon*: Themed prompts to spice up your Q&As (e.g., “Whisper Your Secrets”).

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Auth**: JWT (HTTP-only cookies + localStorage), bcrypt for password hashing
- **Moderation**: Gemini API (planned)
- **Deployment**: TBD (e.g., Vercel, Render, MongoDB Atlas)

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/whisperlink.git
   cd whisperlink