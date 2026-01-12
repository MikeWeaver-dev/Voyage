# Voyage

## Background

Voyage is a **working and scalable social media platform** built to showcase full-stack web development skills, with a particular focus on **server-side logic, database design, and real-world CRUD operations** paired with a clean, modern frontend.

I built Voyage to better practice end-to-end development (from authentication to database handling) and to deepend my knowledge of CRUD operations. The app supports real interactions—creating posts and sub-posts, liking content, following friends, editing profiles, uploading photos, and more.

This project was designed to be scalable indefinitely, utilizing Firebase's dynamic resource allocation to handle a theoretical spike in traffic.

Voyage is written entirely in **JavaScript and React**, with **Firebase Authentication** and **Firestore** powering the backend. It highlights how a responsive, user-friendly frontend can integrate seamlessly with a real-time database and authentication layer.

You can explore Voyage and its source code through my portfolio at **mikeweaver.dev**, where all related links are available.

---

## Key Features

- Full user authentication with **Google Sign-In**
- Create, edit, and delete posts
- Nested sub-posts
- Like and unlike posts
- Follow and unfollow other users
- Editable user profiles
- Photo uploads
- Real-time data updates via Firestore
- Persistent data across sessions
- Scalable database structure designed for growth

---

## Tech Stack

- JavaScript  
- JSX  
- HTML  
- CSS  
- React  
- Firebase Authentication  
- Firestore  

---

## Architecture Overview

- **Frontend:** React-based, focused on clean UI/UX and reusable components  
- **Backend / Database:** Firebase & Firestore for authentication, data persistence, and real-time updates  
- **Design Approach:** Component-driven architecture to ensure consistency and maintainability  

This project emphasizes **clean separation of concerns**, reusable UI patterns, and predictable data flow between the frontend and database.

---

## Installation

### Prerequisites
- Node.js
- npm
- Firebase

### Setup

```bash
npm install
npm start

Note: This code does not include access to my Firebase server. You'll have to set up your own firebase and firebase connection to run the app on your own
