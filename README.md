User Management System

Laravel 11 + vite + Tailwind CSS + React

Requirements

- PHP >= 8.2
- Composer >= 2

Steps
- npm install
- composer update --ignore-platform-reqs
- cp .env.example .env
- config database
- php artisan key:generate
- php artisan config:cache
- npm run dev
- php artisan permission:cache-reset
- php artisan db:seed --class=PayloadSeeder

