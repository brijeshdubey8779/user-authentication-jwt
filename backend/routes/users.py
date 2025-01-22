from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.jwt_helpers import generate_jwt
from db import get_db_cursor
import psycopg2
from flask_jwt_extended import jwt_required, get_jwt_identity


auth_bp = Blueprint('auth', __name__)
@auth_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email, role FROM users")
    users = cursor.fetchall()
    return jsonify({"users": [
        {"id": user[0], "username": user[1], "email": user[2], "role": user[3]} for user in users
    ]})


@app.route('/admin/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_role(user_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    new_role = data.get('role')
    if new_role not in ['admin', 'doctor', 'technician']:
        return jsonify({"message": "Invalid role"}), 400

    cursor = conn.cursor()
    cursor.execute("UPDATE users SET role = %s WHERE id = %s", (new_role, user_id))
    conn.commit()
    return jsonify({"message": "Role updated successfully"})
