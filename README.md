# ⚙️ Backend

<div align="center">
    <img src="https://skillicons.dev/icons?i=nodejs,javascript,express,redis,mysql,npm,docker,github" /><br>
</div>

This is a backend architecture based on microservices. It includes multiple services built using **Node.js (Express.js)** and leverages **Docker** and **Docker Compose** for orchestration.

## Overview

Backend-Services-Vocal-Agent is a microservices-based backend system designed for our project, supporting authentication and notifications. Each service is containerized using Docker and communicates via REST APIs. The stack uses Node.js, Express, Sequelize (MySQL), Redis, and other supporting libraries.

---

## Architecture

**Services:**
- **auth-service**: Handles authentication, JWT issuance, and token management.
- **notification-service**: Sends email notifications.
- **mysql**: MySQL database for persistent storage.
- **redis**: Redis for token allow-list and caching.

Each service is isolated and communicates with others via HTTP APIs.

---

## Directory Structure

```
.
├── docker-compose.yml
├── .env
├── services/
│   ├── auth-service/
│   └── notification-service/
└── ...
```

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Environment Variables

Copy `.env.example` to the project root and rename it `.env` and fill in the required values. Example:

Each service may use its own `.env` file for service-specific configuration.

---

### Build and Run All Services

```bash
docker-compose up --build
```

This will build and start all services, including MySQL and Redis.

---

## Services Overview

### 1. **auth-service**
- **Port:** 3000
- **Endpoints:**
  - `POST /auth/login` — Authenticate user and get JWT
  - `POST /auth/register` — Sign-up as a new user
  - `GET /auth/profile` — Get authenticated user profile
  - `PUT /auth/self-user` — Update the user profile
  - `POST /auth//user/changepassword` — Update the user's password
  - `POST /auth/logout` — Invalidate JWT

### 2. **notification-service**
- **Port:** 4000
- **Endpoints:**
  - `POST /send` — Send an email

---

## Database

- **MySQL** is used for persistent storage.
- **Sequelize** ORM is used for model definitions and migrations.
- **Redis** is used for token allow-list and caching.

---

## Development

### Running a Single Service

You can run a single service for development:

```bash
cd services/users-management
npm install
npm run dev
```

Make sure MySQL and Redis are running (can use Docker Compose).

### Seeding Data

The `auth-service` seeds users on startup if the tables are empty.

---

## Authentication

- JWT-based authentication.
- Tokens are stored in Redis allow-list for validation and can be invalidated on logout.

---

## Email Notifications

- The `notification-service` uses SMTP credentials from environment variables to send emails.

---

## Useful Commands

- **Build and start all services:**  
  `docker-compose up --build`
- **Stop all services:**  
  `docker-compose down`
- **Remove all volumes (reset DB):**  
  `docker-compose down -v`
- **View logs:**  
  `docker-compose logs -f`

---

## Troubleshooting

- **Environment variables:**  
  Ensure all required variables are set in `.env` files.

---

## License

MIT License. See [LICENSE.txt](LICENSE.txt).
