// Supabase Client Configuration
// Credentials are loaded from .env file (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase Client (using different name to avoid conflict with library)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database Helper Functions
const db = {
    // Generic CRUD Operations
    async getAll(table, options = {}) {
        let query = supabaseClient.from(table).select(options.select || '*');

        if (options.orderBy) {
            query = query.order(options.orderBy, { ascending: options.ascending ?? true });
        }
        if (options.limit) {
            query = query.limit(options.limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async getById(table, id, idColumn = 'id') {
        const { data, error } = await supabaseClient
            .from(table)
            .select('*')
            .eq(idColumn, id)
            .single();

        if (error) throw error;
        return data;
    },

    async create(table, record) {
        const { data, error } = await supabaseClient
            .from(table)
            .insert(record)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(table, id, updates, idColumn = 'id') {
        const { data, error } = await supabaseClient
            .from(table)
            .update(updates)
            .eq(idColumn, id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(table, id, idColumn = 'id') {
        const { error } = await supabaseClient
            .from(table)
            .delete()
            .eq(idColumn, id);

        if (error) throw error;
        return true;
    },

    // Custom Queries
    async query(table, selectQuery, filters = {}) {
        let query = supabaseClient.from(table).select(selectQuery);

        Object.keys(filters).forEach(key => {
            query = query.eq(key, filters[key]);
        });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Raw SQL Query (using RPC)
    async rawQuery(functionName, params = {}) {
        const { data, error } = await supabaseClient.rpc(functionName, params);
        if (error) throw error;
        return data;
    },

    // Get table count
    async count(table) {
        const { count, error } = await supabaseClient
            .from(table)
            .select('*', { count: 'exact', head: true });

        if (error) throw error;
        return count;
    }
};

// Table-specific operations
const patients = {
    getAll: () => db.getAll('patients', { orderBy: 'patient_id' }),
    getById: (id) => db.getById('patients', id, 'patient_id'),
    create: (data) => db.create('patients', data),
    update: (id, data) => db.update('patients', id, data, 'patient_id'),
    delete: (id) => db.delete('patients', id, 'patient_id'),
    count: () => db.count('patients')
};

const doctors = {
    getAll: () => supabaseClient.from('doctors').select(`
        *,
        departments (department_name)
    `).order('doctor_id'),
    getById: (id) => db.getById('doctors', id, 'doctor_id'),
    create: (data) => db.create('doctors', data),
    update: (id, data) => db.update('doctors', id, data, 'doctor_id'),
    delete: (id) => db.delete('doctors', id, 'doctor_id'),
    count: () => db.count('doctors')
};

const departments = {
    getAll: () => db.getAll('departments', { orderBy: 'department_id' }),
    getById: (id) => db.getById('departments', id, 'department_id'),
    create: (data) => db.create('departments', data),
    update: (id, data) => db.update('departments', id, data, 'department_id'),
    delete: (id) => db.delete('departments', id, 'department_id'),
    count: () => db.count('departments')
};

const appointments = {
    getAll: () => supabaseClient.from('appointments').select(`
        *,
        patients (name),
        doctors (doctor_name)
    `).order('appointment_id', { ascending: false }),
    getById: (id) => db.getById('appointments', id, 'appointment_id'),
    create: (data) => db.create('appointments', data),
    update: (id, data) => db.update('appointments', id, data, 'appointment_id'),
    delete: (id) => db.delete('appointments', id, 'appointment_id'),
    count: () => db.count('appointments'),
    getToday: () => {
        const today = new Date().toISOString().split('T')[0];
        return supabaseClient.from('appointments')
            .select('*, patients(name), doctors(doctor_name)')
            .eq('date', today);
    }
};

const medicines = {
    getAll: () => db.getAll('medicines', { orderBy: 'medicine_id' }),
    getById: (id) => db.getById('medicines', id, 'medicine_id'),
    create: (data) => db.create('medicines', data),
    update: (id, data) => db.update('medicines', id, data, 'medicine_id'),
    delete: (id) => db.delete('medicines', id, 'medicine_id'),
    count: () => db.count('medicines'),
    getLowStock: (threshold = 10) => supabaseClient.from('medicines')
        .select('*')
        .lt('stock_quantity', threshold)
};

const vendors = {
    getAll: () => db.getAll('vendors', { orderBy: 'vendor_id' }),
    getById: (id) => db.getById('vendors', id, 'vendor_id'),
    create: (data) => db.create('vendors', data),
    update: (id, data) => db.update('vendors', id, data, 'vendor_id'),
    delete: (id) => db.delete('vendors', id, 'vendor_id'),
    count: () => db.count('vendors')
};

const supplies = {
    getAll: () => supabaseClient.from('supplies').select(`
        *,
        vendors (vendor_name),
        medicines (medicine_name)
    `).order('supply_id', { ascending: false }),
    getById: (id) => db.getById('supplies', id, 'supply_id'),
    create: (data) => db.create('supplies', data),
    update: (id, data) => db.update('supplies', id, data, 'supply_id'),
    delete: (id) => db.delete('supplies', id, 'supply_id'),
    count: () => db.count('supplies')
};

const prescriptions = {
    getAll: () => supabaseClient.from('prescriptions').select(`
        *,
        appointments (date, patients(name)),
        medicines (medicine_name)
    `).order('prescription_id', { ascending: false }),
    getById: (id) => db.getById('prescriptions', id, 'prescription_id'),
    create: (data) => db.create('prescriptions', data),
    update: (id, data) => db.update('prescriptions', id, data, 'prescription_id'),
    delete: (id) => db.delete('prescriptions', id, 'prescription_id'),
    count: () => db.count('prescriptions')
};

const bills = {
    getAll: () => supabaseClient.from('bills').select(`
        *,
        appointments (date, patients(name), doctors(doctor_name))
    `).order('bill_id', { ascending: false }),
    getById: (id) => db.getById('bills', id, 'bill_id'),
    create: (data) => db.create('bills', data),
    update: (id, data) => db.update('bills', id, data, 'bill_id'),
    delete: (id) => db.delete('bills', id, 'bill_id'),
    count: () => db.count('bills'),
    getTotalRevenue: async () => {
        const { data, error } = await supabaseClient.from('bills').select('total_amount');
        if (error) throw error;
        return data.reduce((sum, bill) => sum + (bill.total_amount || 0), 0);
    }
};

// Export for use in other files
window.supabaseClient = supabaseClient;
window.db = db;
window.patients = patients;
window.doctors = doctors;
window.departments = departments;
window.appointments = appointments;
window.medicines = medicines;
window.vendors = vendors;
window.supplies = supplies;
window.prescriptions = prescriptions;
window.bills = bills;
