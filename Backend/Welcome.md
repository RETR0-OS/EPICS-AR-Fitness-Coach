# Backend Documentation

## Authentication Endpoints

### 1. Login
- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "<user>",
    "password": "<password>"
  }