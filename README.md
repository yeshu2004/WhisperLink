# WhisperLink

*Drop questions in the shadows, answer in the light.*

**WhisperLink** is a sleek, anonymous Q&A platform built with the MERN stack. Creators craft shareable links (e.g., `whisperlink.com/username`), invite anonymous questions, and respond publicly or privately—all while keeping the experience fun, safe, and toxic-free. Whether it’s spilling secrets or sparking curiosity, WhisperLink connects people through the power of anonymity.

---

## Screenshots

<img width="1470" height="880" alt="Screenshot 2026-07-08 at 1 18 50 AM" src="https://github.com/user-attachments/assets/263df313-d27c-43c2-be6c-d1cca0001019" />
<img width="1470" height="881" alt="Screenshot 2026-07-08 at 1 20 56 AM" src="https://github.com/user-attachments/assets/599e2ca9-10cb-45f6-bb0f-7ab9932e6fae" />

---


## Features

- **Anonymous Questions**: Askers drop questions without a trace—no accounts, no tracking.
- **Creator Control**: Sign up, log in, and manage your Q&A links with ease.
- **Shareable Links**: One-click URLs perfect for Instagram, TikTok, or anywhere.
- **Safe Space**: Powered by moderation (Gemini API coming soon) to filter out toxicity.
- **Timestamps**: Every action logged with `createdAt` and `updatedAt` for clarity.
- **Audio & Text Messaging**: Send and receive both text and audio whispers.
- **Link Management**: View, copy, and manage all your generated links.
- **Soft & Hard Delete with Cron Jobs**: Links are soft-deleted after a set period and hard-deleted later, using scheduled cron jobs.
- **Data Encryption**: All messages are encrypted using AES-256-CBC with a secret key (see [`src/utils/encryption.js`](backend/src/utils/encryption.js)).
- **Authentication**: JWT-based authentication with HTTP-only cookies and localStorage.
- **AWS S3 Audio Storage**: Audio whispers are securely uploaded and stored in AWS S3.

*Coming Soon*: Themed prompts to spice up your Q&As (e.g., “Whisper Your Secrets”).

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Auth**: JWT (HTTP-only cookies + localStorage), bcrypt for password hashing
- **Moderation**: Gemini API (planned)
- **Encryption**: Node.js `crypto` module (AES-256-CBC)
- **Audio Storage**: AWS S3
- **Scheduling**: node-cron (for link cleanup)
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
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file with:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     SECRET_KEY=your_64_char_hex_key
     BUCKET_NAME=your_s3_bucket
     AWS_ACCESS_KEY_ID=your_access_key
     AWS_SECRET_ACCESS_KEY=your_secret_key
     AWS_REGION=your_region
     ```

   - Create SECRET_KEY:
   ```bash 
   echo "SECRET_KEY=$(openssl rand -hex 32)" >> .env
   ``` 

   - Create JWT_SECRET:
   ```bash 
    echo "JWT_SECRET=$(openssl rand -base64 64)" > .env
   ``` 

   - Start the backend:
     ```bash
     npm start
     ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## Usage

- Register and log in from the frontend.
- Generate a unique link to receive anonymous messages.
- Share your link. Others can send you text or audio messages.
- View and manage your received messages and audio notes.
- All messages are encrypted at rest for privacy.

---

## Security & Data Protection

- **Encryption**: All messages are encrypted using AES-256-CBC before being stored in the database.  
  See [`backend/src/utils/encryption.js`](backend/src/utils/encryption.js) for implementation.
- **Authentication**: JWT tokens are stored in HTTP-only cookies for secure session management.
- **Audio Storage**: Audio files are uploaded to AWS S3 using pre-signed URLs.

---

## Cron Jobs

- **Soft Delete:** Runs hourly, marks expired links as deleted.
- **Hard Delete:** Runs daily, permanently removes links marked for deletion.

---


## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Credits

- Inspired by [ngl.link](https://ngl.link/)
- Built with ❤️.
