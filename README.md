# Finance Backend API

In this project, the backend is built to manage finance records with secure login and role-based access.

Tech stack I used:
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication

## Links

- Live API: `https://finance-backend-8f18.onrender.com`
- Local API base: `http://localhost:5000`

## What is included

- User signup/login
- Role-based access (`viewer`, `analyst`, `admin`)
- Finance record CRUD (income/expense)
- Dashboard endpoints (summary, category totals, monthly trends, recent activity)
- Pagination on records listing

## Role behavior

- `viewer` -> can view records and dashboard
- `analyst` -> can view records and dashboard
- `admin` -> full control (users + records + role updates)

## Run this project locally

1. Install dependencies

```bash
npm install
```

2. Create `.env` in the root folder:

```env
MONGODB_URI=mongodb://localhost:27017/finance-backend
JWT_SECRET=my_secret_key_here
PORT=5000
```

3. Start the server

```bash
npm start
```

If everything is fine, server should run on `http://localhost:5000`.

---

## Fast local test flow (PowerShell)

This is the exact flow I use to verify the API quickly.

### 1) Initialize roles (first time only)

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:5000/api/roles/init-default-roles" -ContentType "application/json" -Body "{}"
```

Note: this endpoint is `POST`, not `GET`.

### 2) Register an admin user

```powershell
$register = @{
  username = "demo_admin"
  email    = "demo_admin@example.com"
  password = "Pass@12345"
  role     = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Method POST -Uri "http://localhost:5000/api/users" -ContentType "application/json" -Body $register
```

### 3) Login and capture JWT

```powershell
$login = @{
  email    = "demo_admin@example.com"
  password = "Pass@12345"
} | ConvertTo-Json

$loginResp = Invoke-RestMethod -Method POST -Uri "http://localhost:5000/api/users/login" -ContentType "application/json" -Body $login
$token = $loginResp.token
```

### 4) Call a protected route

```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:5000/api/records" -Headers @{ Authorization = "Bearer $token" }
```

---

## API list

### Public endpoints

- `GET /`
- `POST /api/roles/init-default-roles`
- `GET /api/roles`
- `GET /api/roles/:id`
- `POST /api/users`
- `POST /api/users/login`

### Protected endpoints (`Authorization: Bearer <token>` required)

Users:
- `GET /api/users` (admin)
- `GET /api/users/:id`
- `PATCH /api/users/:id/role` (admin)
- `PATCH /api/users/:id/toggle-status` (admin)
- `DELETE /api/users/:id` (admin)

Records:
- `POST /api/records`
- `GET /api/records` (supports optional filters: `type`, `category`, `startDate`, `endDate` + pagination `page`, `limit`)
- `GET /api/records/:id`
- `GET /api/records/user/:userId`
- `PATCH /api/records/:id`
- `DELETE /api/records/:id`

Dashboard:
- `GET /api/dashboard/summary`
- `GET /api/dashboard/category-totals`
- `GET /api/dashboard/recent-activity`
- `GET /api/dashboard/monthly-trends`
- `GET /api/dashboard/user/:userId/summary`

---

## Sample request payloads

Register:

```json
{
  "username": "john123",
  "email": "john123@example.com",
  "password": "Pass@12345",
  "role": "viewer"
}
```

Login:

```json
{
  "email": "john123@example.com",
  "password": "Pass@12345"
}
```

Create record:

```json
{
  "amount": 1200,
  "type": "income",
  "category": "salary",
  "description": "April salary",
  "date": "2026-04-01",
  "userId": "USER_ID_HERE"
}
```

---

## Common mistakes while testing

- `401 Unauthorized` -> token missing or invalid
- `403 Forbidden` -> role/permission issue
- `404 Route not found` -> wrong URL path
- `Cast to ObjectId failed` -> often happens when request method is wrong (for example using `GET` on `/api/roles/init-default-roles`)

---

## Final note

You can test this backend from PowerShell, Postman, Insomnia, or curl.  
As long as method + route + token are correct, results should be same everywhere.

