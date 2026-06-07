-- =====================================================
-- Hospital Management System - Database Schema
-- Task 3: Schema with Integrity Constraints & Indexes
-- =====================================================

-- 1. Departments Table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Patients Table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age > 0 AND age < 150),
    gender VARCHAR(10),
    address TEXT,
    contact_no VARCHAR(15) NOT NULL
);

-- 3. Doctors Table
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    doctor_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    consultation_fee DECIMAL(10,2) CHECK (consultation_fee > 0),
    availability VARCHAR(100),
    department_id INTEGER REFERENCES departments(department_id) ON DELETE SET NULL
);

-- 4. Appointments Table
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    timeslot TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    diagnosis TEXT,
    patient_id INTEGER NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- 5. Medicines Table
CREATE TABLE medicines (
    medicine_id SERIAL PRIMARY KEY,
    medicine_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    manufacturer VARCHAR(100),
    price_per_unit DECIMAL(10,2) CHECK (price_per_unit > 0),
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0)
);

-- 6. Prescriptions Table
CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    appointment_id INTEGER NOT NULL REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    medicine_id INTEGER NOT NULL REFERENCES medicines(medicine_id) ON DELETE CASCADE,
    dosage VARCHAR(100),
    duration VARCHAR(50)
);

-- 7. Vendors Table
CREATE TABLE vendors (
    vendor_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    license_no VARCHAR(50) UNIQUE NOT NULL,
    contact_details TEXT
);

-- 8. Supplies Table
CREATE TABLE supplies (
    supply_id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    medicine_id INTEGER NOT NULL REFERENCES medicines(medicine_id) ON DELETE CASCADE,
    quantity_supplied INTEGER CHECK (quantity_supplied > 0),
    purchase_cost DECIMAL(10,2),
    supply_date DATE NOT NULL
);

-- 9. Bills Table
CREATE TABLE bills (
    bill_id SERIAL PRIMARY KEY,
    consultant_charge DECIMAL(10,2) DEFAULT 0,
    medicine_charge DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2),
    bill_date DATE NOT NULL,
    appointment_id INTEGER UNIQUE NOT NULL REFERENCES appointments(appointment_id) ON DELETE CASCADE
);

-- =====================================================
-- Indexes for Performance Optimization
-- =====================================================

CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_medicines_category ON medicines(category);
CREATE INDEX idx_medicines_stock ON medicines(stock_quantity);
CREATE INDEX idx_supplies_date ON supplies(supply_date);
CREATE INDEX idx_supplies_vendor ON supplies(vendor_id);
CREATE INDEX idx_prescriptions_appointment ON prescriptions(appointment_id);
CREATE INDEX idx_bills_date ON bills(bill_date);

-- =====================================================
-- Enable Row Level Security (Optional for Supabase)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

-- Allow public access (for demo purposes)
CREATE POLICY "Allow all operations" ON departments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON doctors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON medicines FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON prescriptions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON vendors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON supplies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON bills FOR ALL USING (true) WITH CHECK (true);
