# Hospital Management System - Project Report

**Course**: Database Management Systems  
**Group**: 124  
**Date**: February 2026

---

## 1. Introduction

This project implements a comprehensive Hospital Management System (HMS) web application designed to streamline hospital operations. The system manages patients, doctors, appointments, prescriptions, inventory, and billing through an intuitive web interface connected to a PostgreSQL database via Supabase.

### 1.1 Objectives
- Design a normalized database schema for hospital operations
- Implement CRUD operations for all entities
- Demonstrate SQL query capabilities
- Implement database triggers for automation
- Demonstrate ACID transaction properties

### 1.2 Team Members
| Name | Roll Number | Contribution |
|------|-------------|--------------|
| Rohit Sharma | 2024481 | Database Design, SQL Queries |
| Sameer | 2024501 | Frontend Development, UI/UX |
| Harsh | 2024235 | Backend Integration, Testing |

---

## 2. System Architecture

### 2.1 Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: PostgreSQL (via Supabase)
- **Development**: Vite Dev Server
- **Styling**: Custom CSS with Glassmorphism Design

### 2.2 Architecture Diagram
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Web Browser   │────▶│   JavaScript    │────▶│    Supabase     │
│   (Frontend)    │     │   (main.js)     │     │   (PostgreSQL)  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 3. Database Design

### 3.1 Entity-Relationship Model
The database consists of 9 interconnected tables representing hospital entities.

### 3.2 Tables Overview

| Table | Primary Key | Description |
|-------|-------------|-------------|
| `departments` | department_id | Hospital departments (Cardiology, Neurology, etc.) |
| `patients` | patient_id | Patient demographics and contact info |
| `doctors` | doctor_id | Doctor information with department FK |
| `appointments` | appointment_id | Scheduled patient-doctor meetings |
| `medicines` | medicine_id | Pharmacy inventory |
| `prescriptions` | prescription_id | Medicine prescribed per appointment |
| `vendors` | vendor_id | Medicine suppliers |
| `supplies` | supply_id | Vendor supply records |
| `bills` | bill_id | Patient billing records |

### 3.3 Relationships
- Doctors belong to Departments (N:1)
- Appointments link Patients and Doctors (N:1, N:1)
- Prescriptions link Appointments and Medicines (N:1, N:1)
- Supplies link Vendors and Medicines (N:1, N:1)
- Bills are generated per Appointment (1:1)

### 3.4 Integrity Constraints
- **Primary Keys**: All tables have auto-incrementing SERIAL primary keys
- **Foreign Keys**: Cascading deletes for referential integrity
- **NOT NULL**: Required fields enforced at database level
- **CHECK Constraints**: Age > 0, stock_quantity >= 0, etc.
- **UNIQUE**: Email addresses, phone numbers

---

## 4. SQL Queries (Task 4)

The system implements 20+ SQL queries demonstrating:

### 4.1 Basic Operations
- SELECT with WHERE clauses
- ORDER BY and LIMIT
- NULL handling

### 4.2 Joins
- INNER JOIN between multiple tables
- LEFT JOIN for optional relationships
- Self-referential queries

### 4.3 Aggregations
- COUNT, SUM, AVG functions
- GROUP BY with HAVING
- Subqueries and CTEs

### 4.4 Sample Queries
```sql
-- Query 1: Patient Visit History
SELECT p.name, a.date, a.status, d.doctor_name 
FROM appointments a 
JOIN patients p ON a.patient_id = p.patient_id 
JOIN doctors d ON a.doctor_id = d.doctor_id 
ORDER BY a.date DESC;

-- Query 2: Revenue by Doctor
SELECT d.doctor_name, SUM(b.total_amount) as total_revenue 
FROM bills b 
JOIN appointments a ON b.appointment_id = a.appointment_id 
JOIN doctors d ON a.doctor_id = d.doctor_id 
GROUP BY d.doctor_id, d.doctor_name;

-- Query 3: Low Stock Alert
SELECT medicine_name, stock_quantity 
FROM medicines 
WHERE stock_quantity < 10;
```

---

## 5. Triggers (Task 5)

### 5.1 Implemented Triggers

| Trigger | Event | Action |
|---------|-------|--------|
| `trg_prescription_insert` | AFTER INSERT on prescriptions | Decrements medicine stock |
| `trg_supply_insert` | AFTER INSERT on supplies | Increments medicine stock |
| `trg_bill_insert` | BEFORE INSERT on bills | Calculates total_amount |
| `trg_appointment_audit` | AFTER UPDATE on appointments | Logs status changes |

### 5.2 Example: Stock Update Trigger
```sql
CREATE OR REPLACE FUNCTION update_medicine_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE medicines 
    SET stock_quantity = stock_quantity - 1
    WHERE medicine_id = NEW.medicine_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prescription_insert
AFTER INSERT ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION update_medicine_stock();
```

---

## 6. Transactions (Task 6)

### 6.1 ACID Properties Demonstration

The application demonstrates:
- **Atomicity**: Complete appointment flow (appointment + prescription + bill)
- **Consistency**: Constraint violation handling with rollback
- **Isolation**: Stock update with row-level locking
- **Durability**: Committed transactions persist

### 6.2 Transaction Examples

**Transaction 1: Complete Appointment Flow**
```sql
BEGIN;
INSERT INTO appointments (...) RETURNING appointment_id;
INSERT INTO prescriptions (appointment_id, ...);
INSERT INTO bills (appointment_id, ...);
COMMIT;
```

**Transaction 2: Rollback on Error**
```sql
BEGIN;
INSERT INTO appointments (...);  -- Valid
INSERT INTO appointments (patient_id = 9999, ...);  -- Invalid FK
ROLLBACK;  -- All changes undone
```

---

## 7. Application Features

### 7.1 User Interface
- Modern dark theme with glassmorphism effects
- Responsive sidebar navigation
- Interactive data tables
- Modal forms for CRUD operations
- Toast notifications for feedback

### 7.2 Modules
1. **Dashboard** - Overview statistics
2. **Patients** - Patient management
3. **Doctors** - Doctor management
4. **Appointments** - Scheduling
5. **Medicines** - Inventory
6. **Prescriptions** - Medical records
7. **Vendors** - Supplier management
8. **Supplies** - Stock tracking
9. **Bills** - Financial records
10. **SQL Queries** - Query executor
11. **Triggers** - Trigger documentation
12. **Transactions** - Interactive demos

---

## 8. Testing

### 8.1 Functional Testing
- All CRUD operations tested for each entity
- Query execution verified with result display
- Transaction demos validated

### 8.2 Database Testing
- Trigger functionality verified
- Constraint violations handled correctly
- Referential integrity maintained

---

## 9. Conclusion

The Hospital Management System successfully demonstrates:
- Proper database normalization
- Comprehensive SQL query capabilities
- Trigger-based automation
- ACID-compliant transactions
- Modern web application development

The system is fully functional and ready for deployment.

---

## 10. References

1. PostgreSQL Documentation - https://www.postgresql.org/docs/
2. Supabase Documentation - https://supabase.com/docs
3. MDN Web Docs - https://developer.mozilla.org/

---

**Report Generated**: February 3, 2026  
**Version**: 1.0
