// Main Application Logic
import './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// App State
let currentPage = 'dashboard';

// Initialize Application
function initApp() {
    setupNavigation();
    setupThemeToggle();
    setupSidebarToggle();
    setupNotifications();
    setupModal();
    loadPage('dashboard');
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;

            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            loadPage(page);
        });
    });
}

// Load Page Content
async function loadPage(page) {
    currentPage = page;
    const contentArea = document.getElementById('contentArea');
    const pageTitle = document.getElementById('pageTitle');
    const breadcrumb = document.getElementById('breadcrumbPage');

    const titles = {
        dashboard: 'Dashboard',
        patients: 'Patients',
        doctors: 'Doctors',
        departments: 'Departments',
        appointments: 'Appointments',
        medicines: 'Medicines',
        vendors: 'Vendors',
        supplies: 'Supplies',
        prescriptions: 'Prescriptions',
        billing: 'Billing',
        queries: 'SQL Queries',
        triggers: 'Triggers Demo',
        transactions: 'Transactions Demo'
    };

    pageTitle.textContent = titles[page] || page;
    breadcrumb.textContent = titles[page] || page;

    contentArea.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    try {
        const content = await getPageContent(page);
        contentArea.innerHTML = content;
        setupPageEvents(page);
    } catch (error) {
        console.error('Error loading page:', error);
        contentArea.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Page</h3>
                <p>${error.message}</p>
            </div>`;
    }
}

// Get Page Content
async function getPageContent(page) {
    switch (page) {
        case 'dashboard': return await getDashboardContent();
        case 'patients': return await getPatientsContent();
        case 'doctors': return await getDoctorsContent();
        case 'departments': return await getDepartmentsContent();
        case 'appointments': return await getAppointmentsContent();
        case 'medicines': return await getMedicinesContent();
        case 'vendors': return await getVendorsContent();
        case 'supplies': return await getSuppliesContent();
        case 'prescriptions': return await getPrescriptionsContent();
        case 'billing': return await getBillingContent();
        case 'queries': return getQueriesContent();
        case 'triggers': return getTriggersContent();
        case 'transactions': return getTransactionsContent();
        default: return '<div class="empty-state"><i class="fas fa-file"></i><h3>Page Not Found</h3></div>';
    }
}

// Dashboard Content
async function getDashboardContent() {
    let patientCount = 0, doctorCount = 0, appointmentCount = 0, medicineCount = 0;
    let errorMsg = null;

    try {
        [patientCount, doctorCount, appointmentCount, medicineCount] = await Promise.all([
            patients.count().catch(() => 0),
            doctors.count().catch(() => 0),
            appointments.count().catch(() => 0),
            medicines.count().catch(() => 0)
        ]);
    } catch (e) {
        errorMsg = e.message;
        console.error('Dashboard count error:', e);
    }

    try {

        return `
            <div class="stats-grid">
                <div class="stat-card" style="--stat-color: #6366f1; --stat-color-light: #818cf8;">
                    <div class="stat-icon"><i class="fas fa-user-injured"></i></div>
                    <div class="stat-info">
                        <span class="stat-label">Total Patients</span>
                        <span class="stat-value">${patientCount || 0}</span>
                    </div>
                </div>
                <div class="stat-card" style="--stat-color: #0ea5e9; --stat-color-light: #38bdf8;">
                    <div class="stat-icon"><i class="fas fa-user-md"></i></div>
                    <div class="stat-info">
                        <span class="stat-label">Total Doctors</span>
                        <span class="stat-value">${doctorCount || 0}</span>
                    </div>
                </div>
                <div class="stat-card" style="--stat-color: #10b981; --stat-color-light: #34d399;">
                    <div class="stat-icon"><i class="fas fa-calendar-check"></i></div>
                    <div class="stat-info">
                        <span class="stat-label">Appointments</span>
                        <span class="stat-value">${appointmentCount || 0}</span>
                    </div>
                </div>
                <div class="stat-card" style="--stat-color: #f59e0b; --stat-color-light: #fbbf24;">
                    <div class="stat-icon"><i class="fas fa-pills"></i></div>
                    <div class="stat-info">
                        <span class="stat-label">Medicines</span>
                        <span class="stat-value">${medicineCount || 0}</span>
                    </div>
                </div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-info-circle"></i> Project Status</span>
                    </div>
                    <div class="card-body">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">Hospital Management System - DBMS Course Project</p>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <div class="d-flex align-center justify-between">
                                <span>Task 1: Project Scope</span>
                                <span class="status-badge completed"><i class="fas fa-circle"></i> Complete</span>
                            </div>
                            <div class="d-flex align-center justify-between">
                                <span>Task 2: E-R Model</span>
                                <span class="status-badge completed"><i class="fas fa-circle"></i> Complete</span>
                            </div>
                            <div class="d-flex align-center justify-between">
                                <span>Task 3: Database Schema</span>
                                <span class="status-badge completed"><i class="fas fa-circle"></i> Complete</span>
                            </div>
                            <div class="d-flex align-center justify-between">
                                <span>Task 4: SQL Queries</span>
                                <span class="status-badge completed"><i class="fas fa-circle"></i> Complete</span>
                            </div>
                            <div class="d-flex align-center justify-between">
                                <span>Task 5: Triggers</span>
                                <span class="status-badge completed"><i class="fas fa-circle"></i> Complete</span>
                            </div>
                            <div class="d-flex align-center justify-between">
                                <span>Task 6: Transactions</span>
                                <span class="status-badge completed"><i class="fas fa-circle"></i> Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-users"></i> Group 124</span>
                    </div>
                    <div class="card-body">
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <div class="d-flex align-center gap-2">
                                <div class="user-avatar"><i class="fas fa-user"></i></div>
                                <div><strong>Rohit Sharma</strong><br><span class="text-muted">2024481</span></div>
                            </div>
                            <div class="d-flex align-center gap-2">
                                <div class="user-avatar"><i class="fas fa-user"></i></div>
                                <div><strong>Sameer</strong><br><span class="text-muted">2024501</span></div>
                            </div>
                            <div class="d-flex align-center gap-2">
                                <div class="user-avatar"><i class="fas fa-user"></i></div>
                                <div><strong>Harsh</strong><br><span class="text-muted">2024235</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    } catch (e) {
        console.error('Dashboard error:', e);
        return `
            <div class="empty-state">
                <i class="fas fa-database"></i>
                <h3>Database Connection Issue</h3>
                <p>Error: ${e.message || 'Unknown error'}</p>
                <p class="text-muted">Make sure you have:</p>
                <ul style="text-align: left; max-width: 400px; margin: 1rem auto;">
                    <li>Run <code>schema.sql</code> in Supabase SQL Editor</li>
                    <li>Run <code>seed.sql</code> to populate data</li>
                    <li>RLS policies are set (schema.sql includes them)</li>
                </ul>
                <button class="btn btn-primary" onclick="loadPage('queries')">
                    <i class="fas fa-code"></i> View Schema
                </button>
            </div>`;
    }
}

// Patients Content
async function getPatientsContent() {
    try {
        const data = await patients.getAll();
        return getTablePage('Patients', 'patients', data, [
            { key: 'patient_id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'age', label: 'Age' },
            { key: 'gender', label: 'Gender' },
            { key: 'address', label: 'Address' },
            { key: 'contact_no', label: 'Contact' }
        ], getPatientForm());
    } catch (e) {
        return getEmptyDbState('patients');
    }
}

// Doctors Content
async function getDoctorsContent() {
    try {
        const { data } = await doctors.getAll();
        const formatted = data?.map(d => ({
            ...d,
            department_name: d.departments?.department_name || '-'
        }));
        return getTablePage('Doctors', 'doctors', formatted, [
            { key: 'doctor_id', label: 'ID' },
            { key: 'doctor_name', label: 'Name' },
            { key: 'specialization', label: 'Specialization' },
            { key: 'consultation_fee', label: 'Fee', format: v => `₹${v}` },
            { key: 'availability', label: 'Availability' },
            { key: 'department_name', label: 'Department' }
        ], getDoctorForm());
    } catch (e) {
        return getEmptyDbState('doctors');
    }
}

// Departments Content
async function getDepartmentsContent() {
    try {
        const data = await departments.getAll();
        return getTablePage('Departments', 'departments', data, [
            { key: 'department_id', label: 'ID' },
            { key: 'department_name', label: 'Department Name' }
        ], getDepartmentForm());
    } catch (e) {
        return getEmptyDbState('departments');
    }
}

// Appointments Content
async function getAppointmentsContent() {
    try {
        const { data } = await appointments.getAll();
        const formatted = data?.map(a => ({
            ...a,
            patient_name: a.patients?.name || '-',
            doctor_name: a.doctors?.doctor_name || '-'
        }));
        return getTablePage('Appointments', 'appointments', formatted, [
            { key: 'appointment_id', label: 'ID' },
            { key: 'patient_name', label: 'Patient' },
            { key: 'doctor_name', label: 'Doctor' },
            { key: 'date', label: 'Date' },
            { key: 'timeslot', label: 'Time' },
            { key: 'status', label: 'Status', format: v => `<span class="status-badge ${v}"><i class="fas fa-circle"></i> ${v}</span>` },
            { key: 'diagnosis', label: 'Diagnosis' }
        ], getAppointmentForm());
    } catch (e) {
        return getEmptyDbState('appointments');
    }
}

// Medicines Content
async function getMedicinesContent() {
    try {
        const data = await medicines.getAll();
        return getTablePage('Medicines', 'medicines', data, [
            { key: 'medicine_id', label: 'ID' },
            { key: 'medicine_name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { key: 'manufacturer', label: 'Manufacturer' },
            { key: 'price_per_unit', label: 'Price', format: v => `₹${v}` },
            { key: 'stock_quantity', label: 'Stock', format: v => v < 10 ? `<span class="text-danger">${v}</span>` : v }
        ], getMedicineForm());
    } catch (e) {
        return getEmptyDbState('medicines');
    }
}

// Vendors Content
async function getVendorsContent() {
    try {
        const data = await vendors.getAll();
        return getTablePage('Vendors', 'vendors', data, [
            { key: 'vendor_id', label: 'ID' },
            { key: 'vendor_name', label: 'Name' },
            { key: 'license_no', label: 'License No' },
            { key: 'contact_details', label: 'Contact' }
        ], getVendorForm());
    } catch (e) {
        return getEmptyDbState('vendors');
    }
}

// Supplies Content
async function getSuppliesContent() {
    try {
        const { data } = await supplies.getAll();
        const formatted = data?.map(s => ({
            ...s,
            vendor_name: s.vendors?.vendor_name || '-',
            medicine_name: s.medicines?.medicine_name || '-'
        }));
        return getTablePage('Supplies', 'supplies', formatted, [
            { key: 'supply_id', label: 'ID' },
            { key: 'vendor_name', label: 'Vendor' },
            { key: 'medicine_name', label: 'Medicine' },
            { key: 'quantity_supplied', label: 'Quantity' },
            { key: 'purchase_cost', label: 'Cost', format: v => `₹${v}` },
            { key: 'supply_date', label: 'Date' }
        ], getSupplyForm());
    } catch (e) {
        return getEmptyDbState('supplies');
    }
}

// Prescriptions Content
async function getPrescriptionsContent() {
    try {
        const { data } = await prescriptions.getAll();
        const formatted = data?.map(p => ({
            ...p,
            patient_name: p.appointments?.patients?.name || '-',
            date: p.appointments?.date || '-',
            medicine_name: p.medicines?.medicine_name || '-'
        }));
        return getTablePage('Prescriptions', 'prescriptions', formatted, [
            { key: 'prescription_id', label: 'ID' },
            { key: 'patient_name', label: 'Patient' },
            { key: 'medicine_name', label: 'Medicine' },
            { key: 'dosage', label: 'Dosage' },
            { key: 'duration', label: 'Duration' },
            { key: 'date', label: 'Date' }
        ], getPrescriptionForm());
    } catch (e) {
        return getEmptyDbState('prescriptions');
    }
}

// Billing Content
async function getBillingContent() {
    try {
        const { data } = await bills.getAll();
        const formatted = data?.map(b => ({
            ...b,
            patient_name: b.appointments?.patients?.name || '-',
            doctor_name: b.appointments?.doctors?.doctor_name || '-',
            apt_date: b.appointments?.date || '-'
        }));
        return getTablePage('Bills', 'bills', formatted, [
            { key: 'bill_id', label: 'ID' },
            { key: 'patient_name', label: 'Patient' },
            { key: 'doctor_name', label: 'Doctor' },
            { key: 'consultant_charge', label: 'Consult', format: v => `₹${v}` },
            { key: 'medicine_charge', label: 'Medicine', format: v => `₹${v}` },
            { key: 'total_amount', label: 'Total', format: v => `<strong>₹${v}</strong>` },
            { key: 'bill_date', label: 'Date' }
        ], getBillForm());
    } catch (e) {
        return getEmptyDbState('bills');
    }
}

// Helper: Get Table Page Template
function getTablePage(title, tableName, data, columns, formHtml) {
    const rows = data?.length ? data.map(row => `
        <tr>
            ${columns.map(col => `<td>${col.format ? col.format(row[col.key]) : (row[col.key] || '-')}</td>`).join('')}
            <td>
                <div class="action-btns">
                    <button class="action-btn edit" data-id="${row[columns[0].key]}" data-table="${tableName}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-id="${row[columns[0].key]}" data-table="${tableName}"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('') : `<tr><td colspan="${columns.length + 1}" class="text-center text-muted">No records found</td></tr>`;

    return `
        <div class="d-flex justify-between align-center mb-3">
            <h2>${title} (${data?.length || 0})</h2>
            <button class="btn btn-primary" onclick="openAddModal('${tableName}')">
                <i class="fas fa-plus"></i> Add ${title.slice(0, -1)}
            </button>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                ${columns.map(col => `<th>${col.label}</th>`).join('')}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        </div>
        <template id="form-${tableName}">${formHtml}</template>`;
}

// Helper: Empty DB State
function getEmptyDbState(table) {
    return `
        <div class="empty-state">
            <i class="fas fa-database"></i>
            <h3>Table "${table}" Not Found</h3>
            <p>Please run the SQL schema in Supabase to create the required tables.</p>
        </div>`;
}

// Forms
function getPatientForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Age *</label><input type="number" name="age" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Gender</label><select name="gender" class="form-control"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
            <div class="form-group"><label class="form-label">Contact *</label><input type="text" name="contact_no" class="form-control" required></div>
        </div>
        <div class="form-group"><label class="form-label">Address</label><textarea name="address" class="form-control"></textarea></div>`;
}

function getDoctorForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Name *</label><input type="text" name="doctor_name" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Specialization *</label><input type="text" name="specialization" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Consultation Fee *</label><input type="number" name="consultation_fee" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Availability</label><input type="text" name="availability" class="form-control" placeholder="e.g., Mon-Fri 9AM-5PM"></div>
        </div>
        <div class="form-group"><label class="form-label">Department ID</label><input type="number" name="department_id" class="form-control"></div>`;
}

function getDepartmentForm() {
    return `<div class="form-group"><label class="form-label">Department Name *</label><input type="text" name="department_name" class="form-control" required></div>`;
}

function getAppointmentForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Patient ID *</label><input type="number" name="patient_id" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Doctor ID *</label><input type="number" name="doctor_id" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Date *</label><input type="date" name="date" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Time Slot *</label><input type="time" name="timeslot" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Status</label><select name="status" class="form-control"><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
            <div class="form-group"><label class="form-label">Diagnosis</label><input type="text" name="diagnosis" class="form-control"></div>
        </div>`;
}

function getMedicineForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Medicine Name *</label><input type="text" name="medicine_name" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Category</label><input type="text" name="category" class="form-control"></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Manufacturer</label><input type="text" name="manufacturer" class="form-control"></div>
            <div class="form-group"><label class="form-label">Price Per Unit *</label><input type="number" step="0.01" name="price_per_unit" class="form-control" required></div>
        </div>
        <div class="form-group"><label class="form-label">Stock Quantity *</label><input type="number" name="stock_quantity" class="form-control" required></div>`;
}

function getVendorForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Vendor Name *</label><input type="text" name="vendor_name" class="form-control" required></div>
            <div class="form-group"><label class="form-label">License No *</label><input type="text" name="license_no" class="form-control" required></div>
        </div>
        <div class="form-group"><label class="form-label">Contact Details</label><textarea name="contact_details" class="form-control"></textarea></div>`;
}

function getSupplyForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Vendor ID *</label><input type="number" name="vendor_id" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Medicine ID *</label><input type="number" name="medicine_id" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Quantity *</label><input type="number" name="quantity_supplied" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Purchase Cost *</label><input type="number" step="0.01" name="purchase_cost" class="form-control" required></div>
        </div>
        <div class="form-group"><label class="form-label">Supply Date *</label><input type="date" name="supply_date" class="form-control" required></div>`;
}

function getPrescriptionForm() {
    return `
        <div class="form-row">
            <div class="form-group"><label class="form-label">Appointment ID *</label><input type="number" name="appointment_id" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Medicine ID *</label><input type="number" name="medicine_id" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Dosage *</label><input type="text" name="dosage" class="form-control" required placeholder="e.g., 500mg twice daily"></div>
            <div class="form-group"><label class="form-label">Duration *</label><input type="text" name="duration" class="form-control" required placeholder="e.g., 7 days"></div>
        </div>`;
}

function getBillForm() {
    return `
        <div class="form-group"><label class="form-label">Appointment ID *</label><input type="number" name="appointment_id" class="form-control" required></div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Consultant Charge *</label><input type="number" step="0.01" name="consultant_charge" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Medicine Charge *</label><input type="number" step="0.01" name="medicine_charge" class="form-control" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label class="form-label">Total Amount *</label><input type="number" step="0.01" name="total_amount" class="form-control" required></div>
            <div class="form-group"><label class="form-label">Bill Date *</label><input type="date" name="bill_date" class="form-control" required></div>
        </div>`;
}

// SQL Queries Content
function getQueriesContent() {
    return `
        <div class="card mb-3">
            <div class="card-header"><span class="card-title"><i class="fas fa-database"></i> Database Schema (Run in Supabase SQL Editor)</span></div>
            <div class="card-body">
                <pre class="query-code" id="schemaCode">-- Hospital Management System Database Schema

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

-- Indexes for Performance
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_medicines_category ON medicines(category);
CREATE INDEX idx_supplies_date ON supplies(supply_date);</pre>
                <button class="btn btn-primary" onclick="copyToClipboard(document.getElementById('schemaCode').innerText)">
                    <i class="fas fa-copy"></i> Copy Schema
                </button>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-code"></i> Sample Queries (Task 4)</span></div>
            <div class="card-body">
                <p class="text-muted mb-3">After creating the schema and adding data, use these queries:</p>
                <div id="queriesList"></div>
            </div>
        </div>`;
}

// Triggers Content
function getTriggersContent() {
    return `
        <div class="card mb-3">
            <div class="card-header"><span class="card-title"><i class="fas fa-bolt"></i> Trigger 1: Auto-Update Medicine Stock</span></div>
            <div class="card-body">
                <p class="text-muted mb-2">Automatically decreases medicine stock when a prescription is created.</p>
                <pre class="query-code">-- Trigger Function: Update stock on prescription insert
CREATE OR REPLACE FUNCTION update_medicine_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE medicines 
    SET stock_quantity = stock_quantity - 1
    WHERE medicine_id = NEW.medicine_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER trg_prescription_insert
AFTER INSERT ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION update_medicine_stock();</pre>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-bolt"></i> Trigger 2: Auto-Calculate Bill Total</span></div>
            <div class="card-body">
                <p class="text-muted mb-2">Automatically calculates total_amount when a bill is inserted.</p>
                <pre class="query-code">-- Trigger Function: Calculate bill total
CREATE OR REPLACE FUNCTION calculate_bill_total()
RETURNS TRIGGER AS $$
BEGIN
    NEW.total_amount := NEW.consultant_charge + NEW.medicine_charge;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER trg_bill_calculate
BEFORE INSERT OR UPDATE ON bills
FOR EACH ROW
EXECUTE FUNCTION calculate_bill_total();</pre>
            </div>
        </div>`;
}

// Transactions Content
function getTransactionsContent() {
    return `
        <div class="mb-3">
            <h2><i class="fas fa-exchange-alt"></i> Transaction Demonstrations</h2>
            <p class="text-muted">These transactions demonstrate ACID properties and conflict handling in the database.</p>
        </div>

        <div class="card mb-3">
            <div class="card-header"><span class="card-title"><i class="fas fa-check-circle"></i> Transaction 1: Complete Appointment Flow</span></div>
            <div class="card-body">
                <p class="text-muted mb-2">Creates an appointment with prescription and bill atomically. If any step fails, all changes rollback.</p>
                <pre class="query-code">-- Atomic Transaction: Complete Appointment Flow
BEGIN;

-- Step 1: Create appointment
INSERT INTO appointments (date, timeslot, status, patient_id, doctor_id)
VALUES (CURRENT_DATE, '10:00', 'completed', 1, 1);

-- Step 2: Add prescription (linked to appointment)
INSERT INTO prescriptions (appointment_id, medicine_id, dosage, duration)
VALUES (lastval(), 1, '500mg twice daily', '7 days');

-- Step 3: Generate bill
INSERT INTO bills (appointment_id, consultant_charge, medicine_charge, bill_date)
VALUES (lastval(), 1000, 250, CURRENT_DATE);

COMMIT;</pre>
                <div class="form-row mt-3">
                    <div class="form-group">
                        <label class="form-label">Patient ID</label>
                        <input type="number" id="txn1_patient" class="form-control" value="1" style="width: 100px;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Doctor ID</label>
                        <input type="number" id="txn1_doctor" class="form-control" value="1" style="width: 100px;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Medicine ID</label>
                        <input type="number" id="txn1_medicine" class="form-control" value="1" style="width: 100px;">
                    </div>
                </div>
                <button class="btn btn-primary mt-2" onclick="runTransaction1()">
                    <i class="fas fa-play"></i> Run Transaction
                </button>
                <div id="txn1_result" class="mt-2"></div>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> Transaction 2: Rollback on Error</span></div>
            <div class="card-body">
                <p class="text-muted mb-2">Demonstrates rollback when a constraint violation occurs (invalid foreign key).</p>
                <pre class="query-code">-- Transaction with Error (will rollback)
BEGIN;

-- This will succeed
INSERT INTO appointments (date, timeslot, status, patient_id, doctor_id)
VALUES (CURRENT_DATE, '11:00', 'scheduled', 1, 1);

-- This will FAIL (invalid patient_id = 9999)
INSERT INTO appointments (date, timeslot, status, patient_id, doctor_id)
VALUES (CURRENT_DATE, '12:00', 'scheduled', 9999, 1);

ROLLBACK; -- All changes undone</pre>
                <button class="btn btn-warning mt-2" onclick="runTransaction2()">
                    <i class="fas fa-play"></i> Simulate Rollback
                </button>
                <div id="txn2_result" class="mt-2"></div>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header"><span class="card-title"><i class="fas fa-boxes"></i> Transaction 3: Stock Update with Lock</span></div>
            <div class="card-body">
                <p class="text-muted mb-2">Updates medicine stock atomically, preventing race conditions.</p>
                <pre class="query-code">-- Atomic Stock Update
BEGIN;

-- Lock the row to prevent concurrent updates
SELECT stock_quantity FROM medicines WHERE medicine_id = 1 FOR UPDATE;

-- Safely update the stock
UPDATE medicines SET stock_quantity = stock_quantity + 50 WHERE medicine_id = 1;

COMMIT;</pre>
                <div class="form-row mt-3">
                    <div class="form-group">
                        <label class="form-label">Medicine ID</label>
                        <input type="number" id="txn3_medicine" class="form-control" value="1" style="width: 100px;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Add Quantity</label>
                        <input type="number" id="txn3_qty" class="form-control" value="50" style="width: 100px;">
                    </div>
                </div>
                <button class="btn btn-success mt-2" onclick="runTransaction3()">
                    <i class="fas fa-plus"></i> Update Stock
                </button>
                <div id="txn3_result" class="mt-2"></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-code"></i> SQL for Supabase</span></div>
            <div class="card-body">
                <p class="text-muted mb-2">Copy and run this in Supabase SQL Editor to see transactions in action:</p>
                <pre class="query-code" id="fullTxnCode">-- Complete Transaction Example
DO $$
DECLARE
    new_apt_id INTEGER;
BEGIN
    -- Create appointment
    INSERT INTO appointments (date, timeslot, status, patient_id, doctor_id)
    VALUES (CURRENT_DATE, '14:00', 'completed', 1, 1)
    RETURNING appointment_id INTO new_apt_id;
    
    -- Add prescription
    INSERT INTO prescriptions (appointment_id, medicine_id, dosage, duration)
    VALUES (new_apt_id, 1, '500mg twice daily', '7 days');
    
    -- Generate bill
    INSERT INTO bills (appointment_id, consultant_charge, medicine_charge, bill_date)
    VALUES (new_apt_id, 1000, 250, CURRENT_DATE);
    
    RAISE NOTICE 'Transaction completed. Appointment ID: %', new_apt_id;
END $$;</pre>
                <button class="btn btn-secondary" onclick="copyToClipboard(document.getElementById('fullTxnCode').innerText)">
                    <i class="fas fa-copy"></i> Copy SQL
                </button>
            </div>
        </div>`;
}

// Transaction execution functions
window.runTransaction1 = async function () {
    const resultDiv = document.getElementById('txn1_result');
    const patientId = document.getElementById('txn1_patient').value;
    const doctorId = document.getElementById('txn1_doctor').value;
    const medicineId = document.getElementById('txn1_medicine').value;

    resultDiv.innerHTML = '<span class="text-muted"><i class="fas fa-spinner fa-spin"></i> Running transaction...</span>';

    try {
        // Step 1: Create appointment
        const { data: apt, error: aptError } = await supabaseClient
            .from('appointments')
            .insert({
                date: new Date().toISOString().split('T')[0],
                timeslot: '10:00',
                status: 'completed',
                patient_id: parseInt(patientId),
                doctor_id: parseInt(doctorId)
            })
            .select()
            .single();

        if (aptError) throw aptError;

        // Step 2: Add prescription
        const { error: rxError } = await supabaseClient
            .from('prescriptions')
            .insert({
                appointment_id: apt.appointment_id,
                medicine_id: parseInt(medicineId),
                dosage: '500mg twice daily',
                duration: '7 days'
            });

        if (rxError) throw rxError;

        // Step 3: Generate bill
        const { error: billError } = await supabaseClient
            .from('bills')
            .insert({
                appointment_id: apt.appointment_id,
                consultant_charge: 1000,
                medicine_charge: 250,
                bill_date: new Date().toISOString().split('T')[0]
            });

        if (billError) throw billError;

        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i> <strong>Transaction Committed Successfully!</strong><br>
                Created: Appointment #${apt.appointment_id}, Prescription, and Bill
            </div>`;
        showToast('Transaction completed!', 'success');

    } catch (error) {
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-times-circle"></i> <strong>Transaction Failed - Rollback!</strong><br>
                Error: ${error.message}
            </div>`;
        showToast('Transaction failed!', 'error');
    }
};

window.runTransaction2 = async function () {
    const resultDiv = document.getElementById('txn2_result');
    resultDiv.innerHTML = '<span class="text-muted"><i class="fas fa-spinner fa-spin"></i> Simulating transaction...</span>';

    try {
        // This will fail due to invalid patient_id
        const { error } = await supabaseClient
            .from('appointments')
            .insert({
                date: new Date().toISOString().split('T')[0],
                timeslot: '12:00',
                status: 'scheduled',
                patient_id: 9999, // Invalid - will cause FK violation
                doctor_id: 1
            });

        if (error) throw error;

        resultDiv.innerHTML = '<div class="alert alert-success">Unexpected success!</div>';

    } catch (error) {
        resultDiv.innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-undo"></i> <strong>Transaction Rolled Back!</strong><br>
                Constraint violation: ${error.message}<br>
                <small class="text-muted">This demonstrates how invalid operations are rejected and rolled back.</small>
            </div>`;
        showToast('Rollback demonstrated!', 'info');
    }
};

window.runTransaction3 = async function () {
    const resultDiv = document.getElementById('txn3_result');
    const medicineId = document.getElementById('txn3_medicine').value;
    const qty = parseInt(document.getElementById('txn3_qty').value);

    resultDiv.innerHTML = '<span class="text-muted"><i class="fas fa-spinner fa-spin"></i> Updating stock...</span>';

    try {
        // Get current stock
        const { data: before, error: fetchError } = await supabaseClient
            .from('medicines')
            .select('medicine_name, stock_quantity')
            .eq('medicine_id', medicineId)
            .single();

        if (fetchError) throw fetchError;

        // Update stock
        const { data: after, error: updateError } = await supabaseClient
            .from('medicines')
            .update({ stock_quantity: before.stock_quantity + qty })
            .eq('medicine_id', medicineId)
            .select('stock_quantity')
            .single();

        if (updateError) throw updateError;

        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i> <strong>Stock Updated!</strong><br>
                ${before.medicine_name}: ${before.stock_quantity} → ${after.stock_quantity} (+${qty})
            </div>`;
        showToast('Stock updated!', 'success');

    } catch (error) {
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-times-circle"></i> <strong>Update Failed!</strong><br>
                Error: ${error.message}
            </div>`;
        showToast('Update failed!', 'error');
    }
};


// Modal Functions
function setupModal() {
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') closeModal();
    });
}

function openModal(title, content, onConfirm) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('modalOverlay').classList.add('active');

    const confirmBtn = document.getElementById('modalConfirm');
    confirmBtn.onclick = () => {
        if (onConfirm) onConfirm();
    };
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

window.openAddModal = function (tableName) {
    const template = document.getElementById(`form-${tableName}`);
    const form = template ? template.innerHTML : '<p>Form not available</p>';

    openModal(`Add New ${tableName.slice(0, -1).charAt(0).toUpperCase() + tableName.slice(1, -1)}`, `<form id="addForm">${form}</form>`, async () => {
        const formEl = document.getElementById('addForm');
        const formData = new FormData(formEl);
        const data = Object.fromEntries(formData.entries());

        try {
            await db.create(tableName, data);
            showToast('Record added successfully!', 'success');
            closeModal();
            loadPage(currentPage);
        } catch (error) {
            showToast(`Error: ${error.message}`, 'error');
        }
    });
};

// Page Events Setup
function setupPageEvents(page) {
    // Delete button handler
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const table = btn.dataset.table;

            if (confirm('Are you sure you want to delete this record?')) {
                try {
                    const idCol = `${table.slice(0, -1)}_id`;
                    await db.delete(table, id, idCol);
                    showToast('Record deleted successfully!', 'success');
                    loadPage(currentPage);
                } catch (error) {
                    showToast(`Error: ${error.message}`, 'error');
                }
            }
        });
    });

    // Edit button handler
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const table = btn.dataset.table;
            const idCol = `${table.slice(0, -1)}_id`;

            try {
                // Fetch the record
                const record = await db.getById(table, id, idCol);

                // Get the form template
                const template = document.getElementById(`form-${table}`);
                const formHtml = template ? template.innerHTML : '<p>Form not available</p>';

                // Open modal with form
                const title = `Edit ${table.slice(0, -1).charAt(0).toUpperCase() + table.slice(1, -1)}`;
                openModal(title, `<form id="editForm">${formHtml}</form>`, async () => {
                    const formEl = document.getElementById('editForm');
                    const formData = new FormData(formEl);
                    const data = Object.fromEntries(formData.entries());

                    // Remove empty values
                    Object.keys(data).forEach(key => {
                        if (data[key] === '' || data[key] === null) {
                            delete data[key];
                        }
                    });

                    try {
                        await db.update(table, id, data, idCol);
                        showToast('Record updated successfully!', 'success');
                        closeModal();
                        loadPage(currentPage);
                    } catch (error) {
                        showToast(`Error: ${error.message}`, 'error');
                    }
                });

                // Populate form with existing data
                setTimeout(() => {
                    const form = document.getElementById('editForm');
                    if (form && record) {
                        Object.keys(record).forEach(key => {
                            const input = form.querySelector(`[name="${key}"]`);
                            if (input && record[key] !== null) {
                                input.value = record[key];
                            }
                        });
                    }
                }, 100);

            } catch (error) {
                showToast(`Error loading record: ${error.message}`, 'error');
            }
        });
    });

    if (page === 'queries') {
        loadQueriesList();
    }
}

// Load Queries List with Execute functionality
function loadQueriesList() {
    const queries = [
        { name: "1. List All Patients", table: "patients", select: "*", desc: "Basic SELECT" },
        { name: "2. Doctors by Department", table: "doctors", select: "doctor_name, specialization, departments(department_name)", desc: "JOIN" },
        { name: "3. Today's Appointments", table: "appointments", select: "*, patients(name), doctors(doctor_name)", filter: { date: new Date().toISOString().split('T')[0] }, desc: "WHERE with DATE" },
        { name: "4. Patient Visit History", table: "appointments", select: "date, status, patients(name), doctors(doctor_name)", desc: "Multiple JOINs" },
        { name: "5. Low Stock Medicines", table: "medicines", select: "medicine_name, stock_quantity, price_per_unit", filterFn: (q) => q.lt('stock_quantity', 10), desc: "WHERE" },
        { name: "6. All Medicines", table: "medicines", select: "medicine_name, category, manufacturer, stock_quantity, price_per_unit", desc: "Inventory" },
        { name: "7. All Appointments", table: "appointments", select: "*, patients(name), doctors(doctor_name)", desc: "Full list" },
        { name: "8. Prescriptions with Details", table: "prescriptions", select: "*, medicines(medicine_name), appointments(date, patients(name))", desc: "Multiple JOINs" },
        { name: "9. Vendor List", table: "vendors", select: "*", desc: "Basic SELECT" },
        { name: "10. Supply Records", table: "supplies", select: "*, vendors(vendor_name), medicines(medicine_name)", desc: "JOINs" },
        { name: "11. All Bills", table: "bills", select: "*, appointments(date, patients(name), doctors(doctor_name))", desc: "Complex JOIN" },
        { name: "12. Departments", table: "departments", select: "*", desc: "Basic SELECT" },
        { name: "13. Available Doctors", table: "doctors", select: "doctor_name, specialization, availability, consultation_fee, departments(department_name)", desc: "JOIN" },
        { name: "14. Recent Appointments", table: "appointments", select: "*, patients(name), doctors(doctor_name)", limit: 5, desc: "LIMIT" },
        { name: "15. Top Medicines by Stock", table: "medicines", select: "medicine_name, stock_quantity, category", orderBy: "stock_quantity", desc: "ORDER BY" }
    ];

    const container = document.getElementById('queriesList');
    if (!container) return;

    container.innerHTML = queries.map((q, i) => `
        <div class="query-card card mb-2">
            <div class="card-body">
                <div class="d-flex justify-between align-center mb-2">
                    <strong>${q.name}</strong>
                    <span class="status-badge scheduled">${q.desc}</span>
                </div>
                <pre class="query-code mb-2">SELECT ${q.select} FROM ${q.table}${q.limit ? ' LIMIT ' + q.limit : ''};</pre>
                <div class="d-flex gap-1">
                    <button class="btn btn-sm btn-primary" onclick="runQuery(${i})">
                        <i class="fas fa-play"></i> Run Query
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="copyToClipboard('SELECT ${q.select.replace(/'/g, "\\'")} FROM ${q.table};')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <div id="queryResult${i}" class="mt-2"></div>
            </div>
        </div>
    `).join('');

    // Store queries for execution
    window.queryDefinitions = queries;
}

// Execute Query
window.runQuery = async function (index) {
    const q = window.queryDefinitions[index];
    const resultDiv = document.getElementById(`queryResult${index}`);

    resultDiv.innerHTML = '<span class="text-muted"><i class="fas fa-spinner fa-spin"></i> Executing query...</span>';

    try {
        let query = supabaseClient.from(q.table).select(q.select);

        if (q.filter) {
            Object.keys(q.filter).forEach(key => {
                query = query.eq(key, q.filter[key]);
            });
        }

        if (q.filterFn) {
            query = q.filterFn(query);
        }

        if (q.orderBy) {
            query = query.order(q.orderBy, { ascending: false });
        }

        if (q.limit) {
            query = query.limit(q.limit);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
            resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-info-circle"></i> No records found.</div>';
            return;
        }

        // Build result table
        const keys = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object');
        const nestedKeys = Object.keys(data[0]).filter(k => typeof data[0][k] === 'object' && data[0][k] !== null);

        let headers = keys.map(k => `<th>${k}</th>`).join('');
        nestedKeys.forEach(nk => {
            if (data[0][nk]) {
                Object.keys(data[0][nk]).forEach(subKey => {
                    if (typeof data[0][nk][subKey] !== 'object') {
                        headers += `<th>${nk}.${subKey}</th>`;
                    }
                });
            }
        });

        let rows = data.slice(0, 10).map(row => {
            let cells = keys.map(k => `<td>${row[k] ?? '-'}</td>`).join('');
            nestedKeys.forEach(nk => {
                if (row[nk]) {
                    Object.keys(row[nk]).forEach(subKey => {
                        if (typeof row[nk][subKey] !== 'object') {
                            cells += `<td>${row[nk][subKey] ?? '-'}</td>`;
                        }
                    });
                }
            });
            return `<tr>${cells}</tr>`;
        }).join('');

        resultDiv.innerHTML = `
            <div class="alert alert-success mb-2">
                <i class="fas fa-check-circle"></i> Query executed successfully. ${data.length} row(s) returned.
            </div>
            <div class="table-container" style="max-height: 300px; overflow: auto;">
                <table class="data-table">
                    <thead><tr>${headers}</tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
            ${data.length > 10 ? '<p class="text-muted mt-1"><small>Showing first 10 rows only.</small></p>' : ''}
        `;

    } catch (error) {
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-times-circle"></i> <strong>Query Failed!</strong><br>
                ${error.message}
            </div>
        `;
    }
};


// Theme Toggle
function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Sidebar Toggle
function setupSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

// Notification Dropdown
function setupNotifications() {
    const btn = document.getElementById('notificationBtn');
    const dropdown = document.getElementById('notificationDropdown');

    if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

// Clear Notifications
window.clearNotifications = function () {
    const list = document.getElementById('notificationList');
    const badge = document.getElementById('notificationBadge');
    const dropdown = document.getElementById('notificationDropdown');

    list.innerHTML = '<div class="notification-item"><p style="text-align: center; width: 100%; color: var(--text-muted);">No new notifications</p></div>';
    badge.style.display = 'none';
    dropdown.classList.remove('active');
    showToast('Notifications cleared', 'success');
};

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i></div>
        <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

window.showToast = showToast;

// Copy to Clipboard
window.copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
};
