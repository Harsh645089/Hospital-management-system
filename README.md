# Hospital Management System

A modern web application for managing hospital operations, built with vanilla JavaScript and Supabase.
Live Demo: https://hospital-management-system-1-1483.onrender.com/


## 🚀 Features

- **Patient Management** - Add, edit, delete patient records
- **Doctor Management** - Manage doctors with department assignments
- **Appointment Scheduling** - Book and track appointments
- **Prescription Management** - Link prescriptions to appointments
- **Inventory Management** - Track medicines and supplies
- **Billing System** - Generate and manage bills
- **SQL Query Executor** - Run 15+ predefined queries with live results
- **Transaction Demos** - Interactive ACID transaction demonstrations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: PostgreSQL (via Supabase)
- **Build Tool**: Vite
- **Styling**: Custom CSS with glassmorphism design

## 📦 Installation

1. **Clone/Download** the project

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env with your Supabase credentials
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup Supabase Database**:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run `sql/schema.sql` in the SQL Editor
   - Run `sql/seed.sql` to populate sample data
   - Run `sql/triggers.sql` to create triggers

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open** http://localhost:5173 in your browser

## 📁 Project Structure

```
Hospital management system/
├── index.html          # Main HTML file
├── style.css           # CSS styles (dark theme)
├── main.js             # Application logic
├── supabase.js         # Database client
├── package.json        # NPM configuration
├── sql/
│   ├── schema.sql      # Database schema (9 tables)
│   ├── seed.sql        # Sample data
│   ├── queries.sql     # 20 SQL queries
│   └── triggers.sql    # Database triggers
└── docs/
    ├── Group124.pdf    # Project scope document
    └── dbms task1.pdf  # E-R model document
```

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| `departments` | Hospital departments |
| `patients` | Patient records |
| `doctors` | Doctor information |
| `appointments` | Patient appointments |
| `medicines` | Medicine inventory |
| `prescriptions` | Medicine prescriptions |
| `vendors` | Medicine suppliers |
| `supplies` | Supply records |
| `bills` | Billing records |

## 📝 Course Tasks

| Task | Description | Status |
|------|-------------|--------|
| Task 1 | Project Scope | ✅ Complete |
| Task 2 | E-R Model & Relational Schema | ✅ Complete |
| Task 3 | Database Schema & Sample Data | ✅ Complete |
| Task 4 | 15+ SQL Queries | ✅ Complete |
| Task 5 | Application with Triggers | ✅ Complete |
| Task 6 | Transaction Demonstrations | ✅ Complete |

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📄 License

This project is for educational purposes - DBMS Course Project.
