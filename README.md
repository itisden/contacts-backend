# Contacts CRUD API

A simple CRUD (Create, Read, Update, Delete) API for managing contacts, built with Firebase Cloud Functions. This project allows you to create, retrieve, update, and delete contacts stored in Firestore.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Notes](#notes)

## Features

- **Create a contact**: Add a new contact with details like `username`, `fullname`, `email`, and `phone`.
- **Read contacts**: Retrieve a list of all contacts or a specific contact by ID.
- **Update a contact**: Update details for an existing contact.
- **Delete a contact**: Remove a contact by ID.
- **Error Handling**: Graceful error handling with standardized error messages.
- **Logging**: Request logging for better debugging and tracing.

## Tech Stack

- **Firebase Functions**: Serverless functions for handling HTTP requests.
- **Firestore**: Database for storing contact data.
- **Node.js**: JavaScript runtime.
- **Express**: Middleware for routing.

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/itisden/contacts-backend.git
   cd contacts-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   cd functions
   npm install
   ```

3. **Set up Firebase CLI if you haven’t already:**

   ```bash
   npx firebase login
   npx firebase init
   ```

4. **Initialize Firestore in Firebase:**
   Ensure Firestore is enabled in your Firebase project, as it’s used for contact storage.

## API Endpoints

Method Endpoint Description

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | **`/status`**          | Check API status                |
| GET    | **`/v1/contacts`**     | Retrieve all contacts           |
| GET    | **`/v1/contacts/:id`** | Retrieve a single contact by ID |
| POST   | **`/v1/contacts`**     | Create a new contact            |
| PUT    | **`/v1/contacts/:id`** | Update an existing contact      |
| DELETE | **`/v1/contacts/:id`** | Delete a contact                |

## Running Locally

To run the functions locally:

    npm run serve

## Deployment

To deploy the functions:

    npm run deploy

## Notes

Path aliases in the code are supported via tsx-alias lib. Check https://github.com/firebase/firebase-tools/issues/986#issuecomment-1962253613 link
