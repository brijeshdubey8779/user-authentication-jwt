from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.jwt_helpers import generate_jwt, decode_jwt
from db import get_db_cursor
import psycopg2
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

from flask_jwt_extended import jwt_required, get_jwt_identity



@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user['role']}!"}), 200

@auth_bp.route('/admin-only', methods=['GET'])
@jwt_required()
def admin_only():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Access forbidden"}), 403
    return jsonify({"message": "Welcome, Admin!"}), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'technician')  

    if role not in ['doctor', 'technician', 'admin']:
        return jsonify({"error": "Invalid role"}), 400

    password_hash = generate_password_hash(password)

    query = """
    INSERT INTO users (username, email, password_hash, role)
    VALUES (%s, %s, %s, %s)
    RETURNING id;
    """
    try:
        with get_db_cursor() as cursor:
            cursor.execute(query, (username, email, password_hash, role))
            user_id = cursor.fetchone()['id']
            cursor.connection.commit()
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201
    except psycopg2.IntegrityError:
        return jsonify({"error": "User with this email already exists"}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    """Log in a user and return a JWT token."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    query = """
    SELECT id, password_hash, role FROM users WHERE email = %s;
    """
    with get_db_cursor() as cursor:
        cursor.execute(query, (email,))
        user = cursor.fetchone()

    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_jwt(user['id'], user['role'])
    return jsonify({"token": token, "role": user['role']}), 200

@auth_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_users():
    token = request.headers.get('Authorization')
    print(f"Received Token: {token}")  # Log to verify token format
    current_user = get_jwt_identity()
    print(f"Current User: {current_user}")
    """Fetch all users (admin-only access)."""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    decoded = decode_jwt(token)

    if "error" in decoded:
        return jsonify(decoded), 401

    if decoded['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    current_user = get_jwt_identity()

    if current_user['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403

    try:
        query = "SELECT id, username, email, role FROM users;"
        with get_db_cursor() as cursor:
            cursor.execute(query)
            users = cursor.fetchall()

        return jsonify({
            "users": [
                {"id": user[0], "username": user[1], "email": user[2], "role": user[3]} for user in users
            ]
        }), 200
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# @auth_bp.route('/admin/users', methods=['GET'])
# @jwt_required()
# def get_users():
#     current_user = get_jwt_identity()
#     if current_user['role'] != 'admin':
#         return jsonify({"message": "Unauthorized"}), 403

#     cursor = cursor()
#     query="""
#     SELECT id, username, email, role FROM users
#     """
#     cursor.execute(query)
#     users = cursor.fetchall()
#     print(users)
#     return jsonify({"users": [
#         {"id": user[0], "username": user[1], "email": user[2], "role": user[3]} for user in users
#     ]})


@auth_bp.route('/admin/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_role(user_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    new_role = data.get('role')
    if new_role not in ['admin', 'doctor', 'technician']:
        return jsonify({"message": "Invalid role"}), 400

    cursor = cursor()
    cursor.execute("UPDATE users SET role = %s WHERE id = %s", (new_role, user_id))
    cursor.connection.commit()
    return jsonify({"message": "Role updated successfully"})
