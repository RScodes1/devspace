# DevSpace – Real-Time Collaborative Workspace Backend

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Setup & Run Instructions](#setup--run-instructions)
3. [Design Decisions & Trade-offs](#design-decisions--trade-offs)
4. [Scalability Considerations](#scalability-considerations)
5. [API Documentation](#api-documentation)
6. [Testing Instructions](#testing-instructions)
7. [Deployment Instructions](#deployment-instructions)

## Architecture Overview

DevSpace backend is designed as a **production-grade REST + WebSocket service** to support real-time collaborative coding.  

**Components:**
- **Node.js + Express** – API server
- **PostgreSQL** – relational data (projects, memberships, invites)
- **MongoDB** – document store for activity logs
- **Redis** – caching and async job queue support
- **WebSockets (Socket.io)** – real-time collaboration events
- **BullMQ + Redis** – asynchronous code execution queue
- **Docker** – containerized deployment
- **Swagger / OpenAPI** – API documentation

Client

 HTTP REST + JWT

Express API Server ── WebSocket ──> Socket.io Events

 PostgreSQL (Projects, Memberships, Invites)
    MongoDB (Activity logs)
    Redis (Cache, Job Queue)
    BullMQ Worker (Async code execution)

 
## Setup & Run Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
 ```

 2. Install dependencies
 ```bash
npm install
```

3. Environment Variables

Create a .env file (or use Render/Env config):

NODE_ENV=development
PORT=4500
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
POSTGRES_URL=<postgres-url>
MONGO_URI=<mongo-url>
REDIS_URL=<redis-url>
CORS_ORIGINS=*

5. Run Migrations
```bash
node src/scripts/migrate.js
```

6. Start Server 
```bash
npm run dev
```

Swagger Docs: http://localhost:4500/api/docs
WebSocket URL: ws://localhost:4500


## Design Decisions & Trade-offs

- **Service Layer**: Business logic separated into services for testability.

- **JWT Authentication**: Stateless, scalable; allows token refresh.

- **RBAC** : Owner, Collaborator, Viewer roles enforced via middleware.

- **Async Jobs**: BullMQ queue with Redis, retry logic, idempotency.

- **WebSockets** : Real-time user presence, activity, cursor events.

- **Database Choice**:

- **PostgreSQL** – relational data integrity.

- **MongoDB** – flexible activity logging.

- **Redis** – cache and queue performance.

### Trade-offs:

- WebSocket events are mocked (cursor/file change) due to assignment scope.
- Frontend is not included; evaluation relies on Swagger docs and API correctness.

## Scalability Considerations 

- **Horizontal Scaling**: Node.js server can be replicated behind a load balancer.

- **Redis**: Pub/Sub for event distribution; scales across multiple instances.

- **Job Queue**: BullMQ with Redis supports distributed workers.

- **Database Indexing**: Ensures fast lookups for projects, memberships.

- **Async I/O**: Non-blocking APIs handle high concurrency.

## API Documentation 

All API endpoints are documented with Swagger / OpenAPI 3.0.

***Access locally:***
[http://localhost:4500/api/docs]

**Main endpoints:**

- **POST /api/auth/signup** – Create user

- **POST /api/auth/login** – Authenticate user

- **POST /api/projects** – Create project

- **GET /api/projects** – List projects

- **POST /api/projects/:projectId/workspaces/:workspaceId/execute** – Async code execution

- **GET /api/projects/:projectId/workspaces/jobs/:jobId** – Job status

- **Real-time events via WebSocket** (userJoined, userLeft, activity)


### Testing Instructions
**Unit Tests**

```bash
npm run test:unit
```
**Integration Tests**

```bash
npm run test:integration
```

## Deployment Instructions
Using Render

1. Dockerfile at project root.

2. Environment Variables set in Render dashboard.

3. Deploy:
  Connect GitHub repo
  Select branch
  Build and deploy

Swagger docs live:
[https://(https://devspace-yck7.onrender.com/)/api/docs]
