from flask import Blueprint, request, jsonify
#from app.models.user import User
from model import User
from app import db

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        entity_id = None
        if(user.role_id == 2):
            entity_id = user.nurses[0].EmployeeID
        elif (user.role_id == 3):
             entity_id = user.patient[0].SSN
            
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role_id': user.role_id,
            'entity_id': entity_id
        }
        return jsonify({'success':True,'user': user_data, 'message': 'Login successful'})
    else:
        return jsonify({'success':False,'error': 'Invalid username or password'}), 401

