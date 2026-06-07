-- =====================================================
-- Hospital Management System - Triggers
-- Task 5: Database Triggers
-- =====================================================

-- =====================================================
-- Trigger 1: Auto-Update Medicine Stock on Prescription
-- =====================================================
-- When a prescription is created, decrease the medicine stock by 1

CREATE OR REPLACE FUNCTION update_medicine_stock_on_prescription()
RETURNS TRIGGER AS $$
BEGIN
    -- Decrease stock when prescription is inserted
    IF TG_OP = 'INSERT' THEN
        UPDATE medicines 
        SET stock_quantity = stock_quantity - 1
        WHERE medicine_id = NEW.medicine_id 
        AND stock_quantity > 0;
        
        -- Check if stock is now low
        IF (SELECT stock_quantity FROM medicines WHERE medicine_id = NEW.medicine_id) < 10 THEN
            RAISE NOTICE 'Low stock alert for medicine ID: %', NEW.medicine_id;
        END IF;
    END IF;
    
    -- Restore stock when prescription is deleted
    IF TG_OP = 'DELETE' THEN
        UPDATE medicines 
        SET stock_quantity = stock_quantity + 1
        WHERE medicine_id = OLD.medicine_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for prescription insert
CREATE TRIGGER trg_prescription_insert
AFTER INSERT ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION update_medicine_stock_on_prescription();

-- Create trigger for prescription delete
CREATE TRIGGER trg_prescription_delete
AFTER DELETE ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION update_medicine_stock_on_prescription();


-- =====================================================
-- Trigger 2: Auto-Calculate Bill Total
-- =====================================================
-- Automatically calculate total_amount = consultant_charge + medicine_charge

CREATE OR REPLACE FUNCTION calculate_bill_total()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate total amount
    NEW.total_amount := COALESCE(NEW.consultant_charge, 0) + COALESCE(NEW.medicine_charge, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bill calculation
CREATE TRIGGER trg_bill_calculate_total
BEFORE INSERT OR UPDATE ON bills
FOR EACH ROW
EXECUTE FUNCTION calculate_bill_total();


-- =====================================================
-- Trigger 3: Auto-Update Stock on Supply (Bonus)
-- =====================================================
-- When a supply is recorded, increase the medicine stock

CREATE OR REPLACE FUNCTION update_stock_on_supply()
RETURNS TRIGGER AS $$
BEGIN
    -- Increase stock when supply is recorded
    UPDATE medicines 
    SET stock_quantity = stock_quantity + NEW.quantity_supplied
    WHERE medicine_id = NEW.medicine_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for supply insert
CREATE TRIGGER trg_supply_update_stock
AFTER INSERT ON supplies
FOR EACH ROW
EXECUTE FUNCTION update_stock_on_supply();


-- =====================================================
-- Trigger 4: Audit Log for Appointments (Bonus)
-- =====================================================
-- Track changes to appointment status

-- First create an audit table
CREATE TABLE IF NOT EXISTS appointment_audit (
    audit_id SERIAL PRIMARY KEY,
    appointment_id INTEGER,
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    operation VARCHAR(10)
);

CREATE OR REPLACE FUNCTION log_appointment_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        INSERT INTO appointment_audit (appointment_id, old_status, new_status, operation)
        VALUES (NEW.appointment_id, OLD.status, NEW.status, 'UPDATE');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_appointment_audit
AFTER UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION log_appointment_changes();
