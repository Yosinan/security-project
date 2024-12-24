# Project Description

This project is a comprehensive implementation of a secure Access Control and Authentication System for a web-based application. It incorporates advanced security mechanisms to ensure user data confidentiality, integrity, and protection against unauthorized access. Key features include Role-Based Access Control (RBAC), Audit Trails and Logging, Data Backups, Password Authentication, Token-Based Authentication, and Multi-Factor Authentication (MFA).

## Tech Stack
- **Node.js** with **Express.js**
- **PostgreSQL** for persistent data storage

## Installation

### Prerequisites
- Node.js
- PostgreSQL

### Steps

1. Clone the repository
    ```bash
    git clone https://github.com/Yosinan/security-project.git
    ```
2. Change into the project directory
    ```bash
    cd project6
    ```

3. Install dependencies
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=db_user
    DB_PASSWORD=db_password
    DB_NAME=db_name
    JWT_SECRET=jwt_secret
    ```
5. Create a database in PostgreSQL with the name specified in the `.env` file
6. Run the database migrations
    ```bash
    npm run migrate
    ```
7. Start the server
    ```bash
    npm run dev
    ```
8. The server should now be running at [http://localhost:3000](http://localhost:3000)

<!-- ## API Documentation
The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) after starting the server. -->