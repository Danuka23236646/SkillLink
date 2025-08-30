# SkillLink - Job Platform

A full-stack job platform built with React frontend and .NET Core backend.

## Features

- User authentication (Job Seeker, Employer, Admin roles)
- Job listings and applications
- Profile management
- Admin dashboard

## Getting Started

### Prerequisites

- .NET 9.0 SDK
- Node.js 18+ and npm
- PostgreSQL database (Neon)

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Restore packages:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

The backend will start on `http://localhost:5041`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## Testing Authentication

The system comes with pre-seeded test users:

### Test Users

1. **Job Seeker**
   - Email: `john@example.com`
   - Password: `Password123!`
   - Role: jobseeker

2. **Employer**
   - Email: `jane@example.com`
   - Password: `Password123!`
   - Role: employer

3. **Admin**
   - Email: `admin@example.com`
   - Password: `Password123!`
   - Role: admin

### How to Test

1. Open `http://localhost:5173` in your browser
2. Click "Sign In" or navigate to `/login`
3. Use any of the test credentials above
4. You'll be redirected to the appropriate dashboard based on your role

### API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /healthz` - Health check

## Database

The application uses PostgreSQL with Neon. The connection string is configured in `Backend/appsettings.Development.json`.

## Authentication Flow

1. User enters credentials on login/signup page
2. Frontend sends request to backend API
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. Token is used for subsequent authenticated requests
6. User is redirected to appropriate dashboard based on role

## Security Features

- Password hashing with BCrypt
- JWT token authentication
- Role-based authorization
- CORS configuration for frontend
- Input validation and sanitization