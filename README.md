# User Authentication Microservice

A Node.js microservice for user authentication and session management using Express.js and PostgreSQL.

## Project Structure

```
├── db/
│   └── init.sql           # Database initialization script
├── src/
│   ├── config/
│   │   └── database.js    # Database configuration
│   ├── controllers/
│   │   └── UserController.js # User-related business logic
│   ├── middleware/
│   │   └── auth.js        # Authentication middleware
│   ├── models/
│   │   └── User.js        # User model
│   ├── routes/
│   │   └── userRoutes.js  # API routes definition
│   ├── app.js            # Express application setup
│   └── index.js          # Application entry point
├── docker-compose.yml    # Docker services configuration
├── .env                 # Environment variables
└── package.json         # Project dependencies and scripts
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **PostgreSQL**: Database
- **Docker**: Containerization
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100)
);
```

### Sessions Table

```sql
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    token VARCHAR(100)
);
```

## API Endpoints

### Public Routes

- **POST /register**: Register a new user
- **POST /login**: Authenticate user and get token

### Protected Routes

- **GET /profile**: Get user profile (requires authentication)

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=your_port
   DB_USER=admin
   DB_PASSWORD=admin123456
   DB_NAME=usersdb
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

4. Start the PostgreSQL database:

   ```bash
   docker-compose up -d
   ```

5. Run the application:

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Dependencies

- **bcrypt**: ^5.1.1 - Password hashing
- **cors**: ^2.8.5 - Enable CORS
- **dotenv**: ^16.4.7 - Environment variables
- **express**: ^4.21.2 - Web framework
- **jsonwebtoken**: ^9.0.2 - JWT authentication
- **pg**: ^8.13.1 - PostgreSQL client

## Development Dependencies

- **nodemon**: ^3.1.9 - Development server with hot reload
