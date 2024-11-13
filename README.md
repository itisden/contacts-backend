# Contacts CRUD API

A simple CRUD (Create, Read, Update, Delete) API for managing contacts, built with Firebase Cloud Functions. This project allows you to create, retrieve, update, and delete contacts stored in Firestore.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Deployment](#deployment)
- [Linting](#linting)
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
- **Firestore authentication**: provides backend services to help authenticate users in your application
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

3. **Setup environment variables:**

   ```bash
   cp .env.example .env.local
   ```

4. **Run the functions locally:**
   When running the project locally, it uses the `demo-contacts` project ID for local development.

   ```bash
   npm run serve
   ```

## API Endpoints

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| GET    | **`/status`**                | Check API status                |
| GET    | **`/v1/contacts`**           | Retrieve all contacts           |
| GET    | **`/v1/contacts/:id`**       | Retrieve a single contact by ID |
| POST   | **`/v1/contacts`**           | Create a new contact            |
| PUT    | **`/v1/contacts/:id`**       | Update an existing contact      |
| DELETE | **`/v1/contacts/:id`**       | Delete a contact                |
| POST   | **`/v1/auth/signup`**        | Register a new user             |
| POST   | **`/v1/auth/signin`**        | Login a user                    |
| GET    | **`/v1/auth/refresh-token`** | Refresh token                   |

## Running Locally

To run the functions locally:

    npm run serve

## Testing

Before running the tests, ensure you have a `.env.test` file in the `functions` folder with the necessary environment variables. To run the tests:

```bash
# Run tests without emulator
npm run test

# Run tests with watch mode
npm run test:watch

# Run tests with Firebase emulators
npm run test:emulator
```

## Deployment

To deploy the functions:

    npm run deploy

## Linting

To maintain code quality, linting is set up using ESLint. To run the linter and check for any issues, use the following command:

```bash
npm run lint
```

To automatically fix linting errors, you can run:

## Notes

Path aliases in the code are supported via tsx-alias lib. Check https://github.com/firebase/firebase-tools/issues/986#issuecomment-1962253613 link
