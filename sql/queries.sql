-- =====================================================
-- Hospital Management System - SQL Queries
-- Task 4: 15+ Queries of Varying Complexity
-- =====================================================

-- =====================================================
-- BASIC QUERIES (1-5)
-- =====================================================

-- Query 1: List All Patients
-- Complexity: Basic SELECT
SELECT * FROM patients ORDER BY patient_id;

-- Query 2: List All Doctors with Department Names
-- Complexity: INNER JOIN
SELECT 
    d.doctor_id,
    d.doctor_name,
    d.specialization,
    d.consultation_fee,
    d.availability,
    dept.department_name
FROM doctors d
INNER JOIN departments dept ON d.department_id = dept.department_id
ORDER BY d.doctor_id;

-- Query 3: Today's Appointments
-- Complexity: WHERE with DATE function
SELECT 
    a.appointment_id,
    p.name AS patient_name,
    d.doctor_name,
    a.timeslot,
    a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
WHERE a.date = CURRENT_DATE
ORDER BY a.timeslot;

-- Query 4: All Active/Scheduled Appointments
-- Complexity: WHERE with string comparison
SELECT * FROM appointments 
WHERE status = 'scheduled' 
ORDER BY date, timeslot;

-- Query 5: Medicines with Low Stock (< 10 units)
-- Complexity: WHERE with comparison
SELECT 
    medicine_id,
    medicine_name,
    category,
    stock_quantity,
    price_per_unit
FROM medicines 
WHERE stock_quantity < 10
ORDER BY stock_quantity ASC;

-- =====================================================
-- MEDIUM COMPLEXITY QUERIES (6-10)
-- =====================================================

-- Query 6: Patient Visit History with Doctor Details
-- Complexity: Multiple JOINs, ORDER BY
SELECT 
    p.name AS patient_name,
    a.date AS visit_date,
    d.doctor_name,
    d.specialization,
    a.status,
    a.diagnosis
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
ORDER BY p.name, a.date DESC;

-- Query 7: Total Revenue by Doctor
-- Complexity: GROUP BY with aggregation
SELECT 
    d.doctor_name,
    d.specialization,
    COUNT(b.bill_id) AS total_patients,
    SUM(b.total_amount) AS total_revenue,
    AVG(b.total_amount) AS avg_revenue_per_patient
FROM bills b
JOIN appointments a ON b.appointment_id = a.appointment_id
JOIN doctors d ON a.doctor_id = d.doctor_id
GROUP BY d.doctor_id, d.doctor_name, d.specialization
ORDER BY total_revenue DESC;

-- Query 8: Monthly Appointment Statistics
-- Complexity: DATE_TRUNC, GROUP BY
SELECT 
    DATE_TRUNC('month', date) AS month,
    COUNT(*) AS total_appointments,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled,
    COUNT(CASE WHEN status = 'scheduled' THEN 1 END) AS scheduled
FROM appointments
GROUP BY DATE_TRUNC('month', date)
ORDER BY month;

-- Query 9: Top 5 Most Prescribed Medicines
-- Complexity: COUNT, GROUP BY, LIMIT
SELECT 
    m.medicine_name,
    m.category,
    m.manufacturer,
    COUNT(pr.prescription_id) AS times_prescribed
FROM prescriptions pr
JOIN medicines m ON pr.medicine_id = m.medicine_id
GROUP BY m.medicine_id, m.medicine_name, m.category, m.manufacturer
ORDER BY times_prescribed DESC
LIMIT 5;

-- Query 10: Vendor Supply Analysis
-- Complexity: Multiple aggregations
SELECT 
    v.vendor_name,
    v.license_no,
    COUNT(s.supply_id) AS total_supplies,
    SUM(s.quantity_supplied) AS total_quantity,
    SUM(s.purchase_cost) AS total_cost,
    MAX(s.supply_date) AS last_supply_date
FROM vendors v
LEFT JOIN supplies s ON v.vendor_id = s.vendor_id
GROUP BY v.vendor_id, v.vendor_name, v.license_no
ORDER BY total_cost DESC;

-- =====================================================
-- COMPLEX QUERIES (11-15)
-- =====================================================

-- Query 11: Patients with Most Visits (Subquery)
-- Complexity: Subquery with aggregation
SELECT 
    p.patient_id,
    p.name,
    p.contact_no,
    visit_count
FROM patients p
JOIN (
    SELECT patient_id, COUNT(*) AS visit_count
    FROM appointments
    GROUP BY patient_id
) AS visit_stats ON p.patient_id = visit_stats.patient_id
ORDER BY visit_count DESC;

-- Query 12: Complete Patient Prescription History
-- Complexity: Multiple JOINs across 4 tables
SELECT 
    p.name AS patient_name,
    a.date AS appointment_date,
    d.doctor_name,
    m.medicine_name,
    pr.dosage,
    pr.duration,
    m.price_per_unit AS medicine_price
FROM prescriptions pr
JOIN appointments a ON pr.appointment_id = a.appointment_id
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
JOIN medicines m ON pr.medicine_id = m.medicine_id
ORDER BY p.name, a.date DESC;

-- Query 13: Total Inventory Value
-- Complexity: Calculated fields, aggregation
SELECT 
    medicine_name,
    category,
    stock_quantity,
    price_per_unit,
    (stock_quantity * price_per_unit) AS total_value
FROM medicines
ORDER BY total_value DESC;

-- Total inventory summary
SELECT 
    COUNT(*) AS total_medicines,
    SUM(stock_quantity) AS total_stock,
    SUM(stock_quantity * price_per_unit) AS total_inventory_value
FROM medicines;

-- Query 14: Department-wise Statistics with Revenue
-- Complexity: Multiple JOINs, GROUP BY, aggregations
SELECT 
    dept.department_name,
    COUNT(DISTINCT d.doctor_id) AS doctor_count,
    COUNT(DISTINCT a.appointment_id) AS total_appointments,
    COALESCE(SUM(b.total_amount), 0) AS total_revenue
FROM departments dept
LEFT JOIN doctors d ON dept.department_id = d.department_id
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
LEFT JOIN bills b ON a.appointment_id = b.appointment_id
GROUP BY dept.department_id, dept.department_name
ORDER BY total_revenue DESC;

-- Query 15: Comprehensive Patient Report with CTE
-- Complexity: Common Table Expression (CTE)
WITH patient_visits AS (
    SELECT 
        patient_id,
        COUNT(*) AS visit_count,
        MAX(date) AS last_visit
    FROM appointments
    GROUP BY patient_id
),
patient_bills AS (
    SELECT 
        a.patient_id,
        SUM(b.total_amount) AS total_spent
    FROM bills b
    JOIN appointments a ON b.appointment_id = a.appointment_id
    GROUP BY a.patient_id
)
SELECT 
    p.patient_id,
    p.name,
    p.age,
    p.gender,
    p.contact_no,
    COALESCE(pv.visit_count, 0) AS total_visits,
    pv.last_visit,
    COALESCE(pb.total_spent, 0) AS total_amount_spent
FROM patients p
LEFT JOIN patient_visits pv ON p.patient_id = pv.patient_id
LEFT JOIN patient_bills pb ON p.patient_id = pb.patient_id
ORDER BY total_visits DESC, total_amount_spent DESC;

-- =====================================================
-- ADDITIONAL QUERIES FOR DEMONSTRATION
-- =====================================================

-- Query 16: Find Patients Without Any Appointments
-- Complexity: LEFT JOIN with NULL check
SELECT p.*
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id
WHERE a.appointment_id IS NULL;

-- Query 17: Medicines Never Prescribed
-- Complexity: NOT EXISTS subquery
SELECT m.*
FROM medicines m
WHERE NOT EXISTS (
    SELECT 1 FROM prescriptions pr 
    WHERE pr.medicine_id = m.medicine_id
);

-- Query 18: Doctor Workload Analysis
-- Complexity: CASE with aggregation
SELECT 
    d.doctor_name,
    d.availability,
    COUNT(a.appointment_id) AS total_appointments,
    CASE 
        WHEN COUNT(a.appointment_id) > 10 THEN 'High'
        WHEN COUNT(a.appointment_id) > 5 THEN 'Medium'
        ELSE 'Low'
    END AS workload_level
FROM doctors d
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id, d.doctor_name, d.availability
ORDER BY total_appointments DESC;

-- Query 19: Recent Bills with Full Details
-- Complexity: Multiple JOINs, LIMIT
SELECT 
    b.bill_id,
    b.bill_date,
    p.name AS patient_name,
    d.doctor_name,
    b.consultant_charge,
    b.medicine_charge,
    b.total_amount
FROM bills b
JOIN appointments a ON b.appointment_id = a.appointment_id
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
ORDER BY b.bill_date DESC
LIMIT 10;

-- Query 20: Stock Reorder Report
-- Complexity: UNION with subquery
SELECT 
    medicine_name,
    category,
    stock_quantity,
    'Critical - Reorder Immediately' AS status
FROM medicines WHERE stock_quantity < 10
UNION ALL
SELECT 
    medicine_name,
    category,
    stock_quantity,
    'Low - Consider Reordering' AS status
FROM medicines WHERE stock_quantity >= 10 AND stock_quantity < 50
ORDER BY stock_quantity;
