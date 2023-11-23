from flask import Blueprint
from flask import Flask, jsonify, render_template, request, url_for, redirect
from model import db

admin_bp = Blueprint('admin', __name__)
from model import User, Nurse, Patient, Vaccine, TimeSlot, NurseSchedule

@admin_bp.route('/nurse', methods=['POST'])
def create_nurse():
    data = request.json  # Assuming the data is sent in JSON format in the request body
    # Extract user data
    email = data.get('email')

    # Extract nurse data
    nurse_data = data.get('nurse')
    first_name = data.get('First_Name')
    middle_initial = data.get('Middle_Initial')
    last_name = data.get('Last_Name')
    age = data.get('Age')
    gender = data.get('Gender')
    phone_number = data.get('Phone_Number')
    address = data.get('Address')
    nurse_username = data.get('username')
    nurse_password = data.get('password')

    # Create a new user
    new_user = User(username=nurse_username, email=email, role_id = 2)
    new_user.set_password(nurse_password)  # Set the password using the set_password method
    db.session.add(new_user)
    db.session.commit()

    # Create a new nurse
    new_nurse = Nurse(
        First_Name=first_name,
        Middle_Initial=middle_initial,
        Last_Name=last_name,
        Age=age,
        Gender=gender,
        Phone_Number=phone_number,
        Address=address,
        username=nurse_username,  # Added nurse-specific details
        password=nurse_password,
        user=new_user  # Associate the nurse with the user
    )
    db.session.add(new_nurse)
    db.session.commit()

    return jsonify({'message': 'Nurse registered successfully'})


@admin_bp.route('/nurse/<int:id>', methods=['GET'])
def get_post(id):
    post = TimeSlot.query.get(id)
    # return jsonify(post.nurse_schedule)
    nurses_data = []
    for nurse in post.nurse_schedule:
        nurses_data.append({
            'Maximum_Capacity': nurse.NurseEmployeeID,
            # 'first_name': nurse.First_Name,
            # 'last_name': nurse.Last_Name,
            # Add other nurse attributes as needed
        })
    # return nurses_data

    return {
            # 'user_id': post.id,
            # 'username': post.username,
            # 'email': post.email,
            'nurses': nurses_data,
        }
    # return([post])
    # if post:
    #         return {
    #             'id': post.nurses.First_Name,
    #             'title': post.username,
    #             # 'content': post.content,
    #             # 'user_id': post.user_id,
    #             # 'author_username': post.user.username,
    #     }
    # return {'message': 'Post not found'}, 404

# @admin_bp.route('/nurse/<int:id>', methods=['GET'])
# def get_post(id):
#     print(id,"dii")
#     post = User.query.get(id)
#     nurses_data = []
#     for nurse in post.nurses:
#         nurses_data.append({
#             'nurse_id': nurse.EmployeeID,
#             'first_name': nurse.First_Name,
#             'last_name': nurse.Last_Name,
#             # Add other nurse attributes as needed
#         })

#     return {
#             'user_id': post.id,
#             'username': post.username,
#             'email': post.email,
#             'nurses': nurses_data,
#         }
#     # return([post])
#     if post:
#             return {
#                 'id': post.nurses.First_Name,
#                 'title': post.username,
#                 # 'content': post.content,
#                 # 'user_id': post.user_id,
#                 # 'author_username': post.user.username,
#         }
#     return {'message': 'Post not found'}, 404