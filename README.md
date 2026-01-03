# MINI SPORTS PLATFORM

## Setup Instructions 
Follow the steps below to run the project locally.

---

## Prerequisites

Make sure you have the following installed on your system:

- **Git**
- **Docker Desktop** (with Docker Compose v2)
- **Windows / macOS / Linux**

Verify Docker installation:
```bash
docker --version
docker compose version
```

## Project Structure
```bash
mini-sports-platform/
├── backend/              # Express + Node backend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── frontend/             # React + Vite frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Environment Variables

Create a .env file inside the backend folder:

```bash

PORT=5000
DB_NAME=sports_platform
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=db
JWT_SECRET=your_secure_jwt_secret
```
## Running the Project with Docker

From the root directory of the project, run:

```bash
docker compose up --build
```
Docker will:
- **Build the backend container**
- **Build the frontend container**
- **Start PostgreSQL database**
- **Connect all services together**

## Application URLs

Once the containers are running:
- **Frontend: http://localhost:3000**
- **Backend API: http://localhost:5000**
- **PostgreSQL: localhost:5432**

## Stopping the Application

To stop all running containers:
```bash
docker compose down
```

## Notes

- **The backend uses JWT authentication**
- **API routes are protected and require authentication**
- **Docker volumes are used to persist PostgreSQL data**
- **CORS is configured to allow frontend access**

## Tech Stack

- **Frontend: React + Vite**
- **Backend: Node.js + Express**
- **Database: PostgreSQL**
- **Authentication: JWT**
- **Containerization: Docker & Docker Compose**

## API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Matches
- GET /matches
- GET /matches/:id

### Favorites
- POST /favorites/:matchId
- DELETE /favorites/:matchId
- GET /favorites
