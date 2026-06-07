-- =====================================================
-- Hospital Management System - Sample Data
-- Task 3: Populate Tables with Simulated Data
-- =====================================================

-- Insert Departments
INSERT INTO departments (department_name) VALUES
    ('Cardiology'),
    ('Neurology'),
    ('Orthopedics'),
    ('Pediatrics'),
    ('Dermatology'),
    ('General Medicine'),
    ('Ophthalmology'),
    ('ENT');

-- Insert Patients
INSERT INTO patients (name, age, gender, address, contact_no) VALUES
    ('Amit Kumar', 35, 'Male', '123 MG Road, Delhi', '9876543210'),
    ('Priya Sharma', 28, 'Female', '456 Park Street, Mumbai', '9876543211'),
    ('Rahul Verma', 45, 'Male', '789 Gandhi Nagar, Bangalore', '9876543212'),
    ('Sneha Patel', 32, 'Female', '321 Nehru Road, Chennai', '9876543213'),
    ('Vikram Singh', 50, 'Male', '654 Rajaji Street, Hyderabad', '9876543214'),
    ('Anjali Gupta', 25, 'Female', '987 Civil Lines, Pune', '9876543215'),
    ('Rajesh Reddy', 40, 'Male', '147 Lake View, Kolkata', '9876543216'),
    ('Meera Joshi', 55, 'Female', '258 Hill Road, Jaipur', '9876543217'),
    ('Sanjay Mehta', 38, 'Male', '369 Station Road, Lucknow', '9876543218'),
    ('Kavitha Nair', 30, 'Female', '741 Beach Road, Kochi', '9876543219');

-- Insert Doctors
INSERT INTO doctors (doctor_name, specialization, consultation_fee, availability, department_id) VALUES
    ('Dr. Arjun Kapoor', 'Cardiologist', 1000.00, 'Mon-Fri 9AM-5PM', 1),
    ('Dr. Neha Singh', 'Neurologist', 1200.00, 'Mon-Sat 10AM-4PM', 2),
    ('Dr. Rakesh Sharma', 'Orthopedic Surgeon', 800.00, 'Mon-Fri 8AM-2PM', 3),
    ('Dr. Sunita Yadav', 'Pediatrician', 600.00, 'Mon-Sat 9AM-6PM', 4),
    ('Dr. Anil Kumar', 'Dermatologist', 700.00, 'Tue-Sat 11AM-7PM', 5),
    ('Dr. Pooja Menon', 'General Physician', 500.00, 'Mon-Sun 8AM-8PM', 6),
    ('Dr. Vivek Jain', 'Ophthalmologist', 900.00, 'Mon-Fri 9AM-3PM', 7),
    ('Dr. Geeta Rao', 'ENT Specialist', 750.00, 'Wed-Sun 10AM-5PM', 8);

-- Insert Medicines
INSERT INTO medicines (medicine_name, category, manufacturer, price_per_unit, stock_quantity) VALUES
    ('Paracetamol 500mg', 'Analgesic', 'Cipla', 2.50, 500),
    ('Amoxicillin 250mg', 'Antibiotic', 'Sun Pharma', 8.00, 300),
    ('Omeprazole 20mg', 'Antacid', 'Dr. Reddys', 5.00, 400),
    ('Metformin 500mg', 'Antidiabetic', 'Lupin', 3.50, 600),
    ('Amlodipine 5mg', 'Antihypertensive', 'Torrent', 4.00, 450),
    ('Cetirizine 10mg', 'Antihistamine', 'Cipla', 2.00, 800),
    ('Azithromycin 500mg', 'Antibiotic', 'Zydus', 25.00, 200),
    ('Ibuprofen 400mg', 'Anti-inflammatory', 'Mankind', 3.00, 350),
    ('Vitamin D3 60000IU', 'Supplement', 'USV', 30.00, 150),
    ('Pantoprazole 40mg', 'Antacid', 'Alkem', 6.00, 500),
    ('Aspirin 75mg', 'Blood Thinner', 'Bayer', 1.50, 700),
    ('Atorvastatin 10mg', 'Cholesterol', 'Ranbaxy', 7.50, 250);

-- Insert Vendors
INSERT INTO vendors (vendor_name, license_no, contact_details) VALUES
    ('MediSupply India', 'DL-2024-001', 'Phone: 011-23456789, Email: contact@medisupply.in'),
    ('PharmaCare Ltd', 'DL-2024-002', 'Phone: 022-34567890, Email: sales@pharmacare.com'),
    ('HealthFirst Distributors', 'DL-2024-003', 'Phone: 080-45678901, Email: info@healthfirst.in'),
    ('National Medical Supply', 'DL-2024-004', 'Phone: 044-56789012, Email: orders@nationalmed.com'),
    ('QuickMeds Wholesale', 'DL-2024-005', 'Phone: 040-67890123, Email: quick@medsupply.in');

-- Insert Appointments
INSERT INTO appointments (date, timeslot, status, diagnosis, patient_id, doctor_id) VALUES
    ('2024-02-01', '09:00', 'completed', 'Routine checkup - Normal', 1, 1),
    ('2024-02-01', '10:00', 'completed', 'Migraine - Prescribed medication', 2, 2),
    ('2024-02-02', '11:00', 'completed', 'Knee pain - X-ray recommended', 3, 3),
    ('2024-02-02', '14:00', 'completed', 'Fever and cold - Viral infection', 4, 4),
    ('2024-02-03', '09:30', 'scheduled', NULL, 5, 1),
    ('2024-02-03', '11:00', 'scheduled', NULL, 6, 5),
    ('2024-02-04', '10:00', 'completed', 'Skin rash - Allergy medication', 7, 5),
    ('2024-02-04', '15:00', 'cancelled', NULL, 8, 6),
    ('2024-02-05', '09:00', 'completed', 'Eye checkup - New glasses prescribed', 9, 7),
    ('2024-02-05', '12:00', 'scheduled', NULL, 10, 8);

-- Insert Prescriptions
INSERT INTO prescriptions (appointment_id, medicine_id, dosage, duration) VALUES
    (1, 5, 'Once daily after breakfast', '30 days'),
    (1, 11, 'Once daily after dinner', '30 days'),
    (2, 1, 'As needed for pain', '7 days'),
    (2, 6, 'Once daily at bedtime', '10 days'),
    (3, 8, 'Twice daily after meals', '14 days'),
    (4, 1, 'Three times daily', '5 days'),
    (4, 2, 'Twice daily after meals', '7 days'),
    (7, 6, 'Once daily', '7 days'),
    (9, 9, 'Once weekly', '8 weeks');

-- Insert Supplies
INSERT INTO supplies (vendor_id, medicine_id, quantity_supplied, purchase_cost, supply_date) VALUES
    (1, 1, 200, 400.00, '2024-01-15'),
    (1, 2, 100, 640.00, '2024-01-15'),
    (2, 3, 150, 600.00, '2024-01-20'),
    (2, 4, 200, 560.00, '2024-01-20'),
    (3, 5, 100, 320.00, '2024-01-22'),
    (3, 6, 300, 480.00, '2024-01-22'),
    (4, 7, 50, 1000.00, '2024-01-25'),
    (4, 8, 100, 240.00, '2024-01-25'),
    (5, 9, 50, 1200.00, '2024-01-28'),
    (5, 10, 100, 480.00, '2024-01-28');

-- Insert Bills
INSERT INTO bills (consultant_charge, medicine_charge, total_amount, bill_date, appointment_id) VALUES
    (1000.00, 165.00, 1165.00, '2024-02-01', 1),
    (1200.00, 24.50, 1224.50, '2024-02-01', 2),
    (800.00, 42.00, 842.00, '2024-02-02', 3),
    (600.00, 63.50, 663.50, '2024-02-02', 4),
    (700.00, 14.00, 714.00, '2024-02-04', 7),
    (900.00, 30.00, 930.00, '2024-02-05', 9);
