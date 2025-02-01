# Chatbox - Real-time Messaging App

## Overview

Chatbox is a modern real-time messaging application designed to facilitate seamless communication between users. It features authentication, user-to-user messaging, and group chat functionalities. The project implements the latest web technologies to provide a smooth and secure user experience.

## Features

- **Authentication:** Implemented using [Auth.js](https://authjs.dev/) and Express.js.
- **Social & Manual Authentication:** Supports Google, Discord, Facebook, and email/password sign-in.
- **forgot-password  functionality:** Supports sending emails to registered users emails who forgot their passwords with a link that only work for them to reset their passwords
- **Scalability & Performance:** Optimized with a well-structured backend and efficient database queries.

## Tech Stack

### **Frontend:**

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### **Backend:**

- Node.js with Express.js
- Auth.js for authentication
- MongoDB with Mongoose 
- WebSockets with `socket.io`

### **Deployment & Tools:**

- Vercel for frontend and backend hosting
- Figma for UI/UX Design ([View Design](https://www.figma.com/design/geoCOyM7vf84wC7opgbqNW/Messaging---Chatbox-App-Design-\(Community\)?node-id=0-1\&p=f\&t=sVuXs6dTSR54Ykve-0))

## Authentication Implementation

- Users can register and log in using Auth.js with providers like Google, Discord, Facebook, and manual email/password.
- Authentication is managed on a separate Express.js [server](https://chatbox-server-eight.vercel.app/) for more info visit this [repo](https://github.com/mohamed20163858/chatbox-server).
- JWT and session-based authentication are supported.
- Secure user authentication with encrypted passwords and OAuth 2.0 flows.

## Installation

### **1. Clone the repository**

```sh
git clone https://github.com/mohamed20163858/chatbox_client
cd chatbox
```

### **2. Install dependencies**

```sh
npm install
```

### **3. Setup environment variables**

Create a `.env` file and configure:

```env
AUTH_SECRET= your_auth_secret # you can generate it using this command in your terminal `npx auth`. Read more: https://cli.authjs.dev
BACKEND_URL= your_backend_url
AUTH_GOOGLE_ID= your_auth_google_id
AUTH_GOOGLE_SECRET= your_auth_google_secret
AUTH_FACEBOOK_ID= your_auth_facebook_id
AUTH_FACEBOOK_SECRET= your_auth_facebook_secret
AUTH_DISCORD_ID= your_auth_discord_id
AUTH_DISCORD_SECRET= your_auth_discord_secret
JWT_SECRET= your_jwt_secret
CLOUDINARY_CLOUD_NAME= your_cloudinary_cloud_name
CLOUDINARY_API_KEY= your_cloudinary_api_key
CLOUDINARY_API_SECRET= your_cloudinary_api_secret


```


### **4. Run the frontend app**

```sh
npm run dev
```

## Future Enhancements
- **Real-time Messaging:** Powered by WebSockets (`socket.io`).
- **User-to-User and Group Chats:** Users can send messages in private or group conversations.
- **Media Sharing:** Supports sending images, videos, and documents.
- **Video & Voice Calls** using WebRTC
- **Polls & Reactions** in group chats
- **Read Receipts & Typing Indicators**
- **Push Notifications**

## Contribution

If you'd like to contribute, feel free to fork the repo and submit a pull request!

---

This project was developed as part of my learning journey and is included in my CV as a demonstration of building authentication for modern applications.

