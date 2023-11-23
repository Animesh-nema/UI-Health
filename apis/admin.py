from flask import Blueprint
from flask import Flask, jsonify, render_template, request, url_for, redirect
from model import Vaccine, db

admin_bp = Blueprint('admin', __name__)
from model import User, Nurse, Patient

@admin_bp.route('/nurse', methods=['POST'])
def create_nurse():
    try:
        data = request.json
        email = data['email']
        if not email:
                return jsonify({'error': 'Email is required'}), 400

        first_name = data.get('First_Name')
        middle_initial = data.get('Middle_Initial')
        employee_id = data.get('EmployeeID')
        last_name = data.get('Last_Name')
        age = data.get('Age')
        gender = data.get('Gender')
        phone_number = data.get('Phone_Number')
        address = data.get('Address')
        nurse_username = data.get('username')
        nurse_password = data.get('password')

        new_user = User(username=nurse_username, email=email, role_id = 2)
        new_user.set_password(nurse_password)  # Set the password using the set_password method
        db.session.add(new_user)
        db.session.commit()

        new_nurse = Nurse(
            EmployeeID=employee_id,
            First_Name=first_name,
            Middle_Initial=middle_initial,
            Last_Name=last_name,
            Age=age,
            Gender=gender,
            Phone_Number=phone_number,
            Address=address,
            user_id=new_user.id
        )
        db.session.add(new_nurse)
        db.session.commit()
        return jsonify({'message': 'Nurse registered successfully'})
    
    except Exception as e:
        print(f"Error creating nurse: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Internal Server Error'}), 500

@admin_bp.route('/nurse/<int:id>', methods=['PUT'])
def update_nurse(id):
    try:
        nurse = Nurse.query.get(id)
        if nurse:
            data = request.json
            nurse.First_Name = data.get('First_Name')
            nurse.Middle_Initial = data.get('Middle_Initial')
            nurse.last_name = data.get('Last_Name')
            nurse.Age = data.get('Age')
            nurse.Gender = data.get('Gender')
            db.session.commit()
            return jsonify({'message': 'Nurse updated successfully'})
        return {'message': 'Nurse not found'}, 404
    except Exception as e:
        print(f"Error updating nurse: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Internal Server Error'}), 500
    
@admin_bp.route('/patient/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    try:
        patient = Patient.query.get(patient_id)

        if patient:
            patient_data = {
                'SSN': patient.SSN,
                'First_Name': patient.First_Name,
                'Middle_Initial': patient.Middle_Initial,
                'Last_Name': patient.Last_Name,
                'Age': patient.Age,
                'Gender': patient.Gender,
                'Race': patient.Race,
                'Occupation_Class': patient.Occupation_Class,
                'Medical_History_Description': patient.Medical_History_Description,
                'Phone_Number': patient.Phone_Number,
                'Address': patient.Address,
                'user_id': patient.user_id
            }

            return jsonify(patient_data)
        else:
            return jsonify({'error': 'Patient not found'}), 404

    except Exception as e:
        print(f"Error getting patient: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    
@admin_bp.route('/vaccines', methods=['GET'])
def get_vaccines():
    try:
        vaccines = Vaccine.query.all()
        vaccine_list = []
        for vaccine in vaccines:
            vaccine_data = {
                'VaccineID': vaccine.VaccineID,
                'Name': vaccine.Name,
                'Company': vaccine.Company,
                'Number_of_Doses': vaccine.Number_of_Doses,
                'Description': vaccine.Description,
                'Availability': vaccine.Availability,
                'OnHold': vaccine.OnHold
            }
            vaccine_list.append(vaccine_data)
        return jsonify(vaccine_list)

    except Exception as e:
        print(f"Error getting vaccines: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500