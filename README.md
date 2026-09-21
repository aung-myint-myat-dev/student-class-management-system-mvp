# Student Class Management System

A simple Student & Classroom Management System built with **Laravel** and **React**.

## Tech Stack

### Backend

* PHP `^8.3`
* Laravel `^13.17`
* Laravel Tinker
* PHPUnit
* Laravel Pint

### Frontend

* React `^19.2.8`
* TypeScript `~6.0.2`
* React Router `^8.4.0`
* Vite `^8.3.0`
* Tailwind CSS `^4.3.3`
* shadcn/ui
* Radix UI
* Axios
* Lucide React
* Sonner

---

## Requirements

Make sure the following are installed on your machine:

* PHP 8.3 or higher
* Composer
* Node.js
* npm
* Git

You can check your installed versions with:

```bash
php -v
composer -V
node -v
npm -v
```

---

# Installation

## 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/aung-myint-myat-dev/student-class-management-system-mvp.git
```

Move into the project directory:

```bash
cd student-class-management-system-mvp
```

---

# Backend Setup

The Laravel backend is located in the project root.

## 2. Install PHP Dependencies

Run:

```bash
cd backend
composer install
```

This will install all PHP dependencies defined in `composer.json`.

---

## 3. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

---

## 4. Configure Database

Open the `.env` file:

```bash
nano .env
```

Or open it using your preferred code editor.

Configure your database connection.

### MySQL Example

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=student_class_management
DB_USERNAME=root
DB_PASSWORD=
```

Create the database in MySQL:

```sql
CREATE DATABASE student_class_management;
```

Then run the migrations:

```bash
php artisan migrate
```

Seed sample data

```bash
php artisan db:seed
```

Or run migrations and seeders together:

```bash
php artisan migrate --seed
```
---

# Frontend Setup

The React application is located inside the `frontend` directory.

## 5. Go to Frontend Directory

```bash
cd frontend
```

---

## 6. Install Node Dependencies

Run:

```bash
npm install
```

This installs the dependencies defined in `frontend/package.json`.

---

## 7. Start Frontend Development Server

Run:

```bash
npm run dev
```

Vite will start the React development server.

You should see a URL similar to:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# Running the Application

You need to run both the Laravel backend and React frontend.

## Terminal 1 — Laravel

From the project root:

```bash
php artisan serve
```

Laravel will normally run at:

```text
http://127.0.0.1:8000
```

## Terminal 2 — React

Go to the frontend directory:

```bash
cd frontend
```

Then:

```bash
npm run dev
```

React will normally run at:

```text
http://localhost:5173
```

---

# Frontend API Configuration

The frontend communicates with the Laravel backend using Axios.

If the project uses an environment variable for the API URL, create:

```text
frontend/.env
```

and configure the API URL according to the project's API configuration.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

After changing environment variables, restart the Vite development server:

```bash
npm run dev
```

---

# Available Commands

## Laravel

### Start Development Server

```bash
php artisan serve
```

### Run Migrations

```bash
php artisan migrate
```

### Run Seeders

```bash
php artisan db:seed
```

### Fresh Database

> Warning: This deletes all existing database tables and data.

```bash
php artisan migrate:fresh
```

### Fresh Database With Seeders

```bash
php artisan migrate:fresh --seed
```

### Code Formatting

Laravel Pint is included in the project.

Run:

```bash
./vendor/bin/pint
```

---

# React

All frontend commands should be executed inside the `frontend` directory.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build command runs TypeScript checking and then creates the Vite production build.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

# Development Workflow

After cloning the project for the first time:

```bash
# Clone project
git clone https://github.com/aung-myint-myat-dev/student-class-management-system-mvp.git

# Enter project
cd student-class-management-system-mvp

# Install Laravel dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env

# Run migrations and seeders
php artisan migrate --seed

# Install frontend dependencies
cd frontend
npm install

# Start frontend
npm run dev
```

In another terminal, start Laravel:

```bash
cd student-class-management-system-mvp

php artisan serve
```

You can then access:

* **Frontend:** `http://localhost:5173`
* **Backend:** `http://127.0.0.1:8000`

---

# Troubleshooting

## Composer Error

If Composer dependencies are missing:

```bash
composer install
```

If Laravel's autoload files need to be regenerated:

```bash
composer dump-autoload
```

---

## Node Modules Error

Remove the existing dependencies and reinstall:

```bash
cd frontend

rm -rf node_modules package-lock.json

npm install
```

Then start the development server:

```bash
npm run dev
```

---

## Database Error

Check your `.env` database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=student_class_management
DB_USERNAME=root
DB_PASSWORD=
```

Make sure MySQL is running and the database exists.

Then clear Laravel's cached configuration:

```bash
php artisan config:clear
```

Run the migrations again:

```bash
php artisan migrate
```

---

## Application Key Error

If Laravel reports that the application key is missing:

```bash
php artisan key:generate
```

---

## Reset Database

If you want to completely reset your development database:

```bash
php artisan migrate:fresh --seed
```

> **Warning:** This command deletes all existing database data.

---

# Production Build

Build the React application:

```bash
cd frontend

npm run build
```

For Laravel optimization:

```bash
php artisan optimize
```

---

# License

This project is for educational and development purposes.
