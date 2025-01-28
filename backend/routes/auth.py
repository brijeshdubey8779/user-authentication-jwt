from flask import Blueprint, request, jsonify, json, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from utils.jwt_helpers import generate_jwt, decode_jwt
from db import get_db_cursor
import psycopg2
from psycopg2.extras import RealDictRow
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
    role = data.get('role', 'technician')  # Default role is 'technician'

    # Validate the role
    valid_roles = ['doctor', 'technician', 'admin']
    if role not in valid_roles:
        return jsonify({"error": "Invalid role"}), 400

    password_hash = generate_password_hash(password)

    try:
        with get_db_cursor() as cursor:
            # Fetch the role_id for the given role name
            cursor.execute("SELECT id FROM roles WHERE role_name = %s;", (role,))
            role_data = cursor.fetchone()
            print(role_data)
            try:
                my_real_dict_row = RealDictRow(role_data)
                role_data = dict(my_real_dict_row) 
                print(role_data)
            except Exception as e:
                print(e)


            if not role_data:
                return jsonify({"error": f"Role '{role}' does not exist in the database"}), 400

            role_id = role_data['id']
            # role_id = role_data[0]['id'] 
            print(role_id)

            # Insert the new user with the role_id
            # Insert the new user with the role_id
            query = """
            INSERT INTO users (username, email, password_hash, role_id)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """
            try:
                with get_db_cursor() as cursor:
                    print("db")
                    try:
                        cursor.execute(query, (username, email, password_hash, role_id))
                    except Exception as e:
                        print(e)
                        return jsonify({"error": str(e)}), 500  # Return error if query fails
                    
                    user_id = cursor.fetchone()['id']
                    print("user_id")
                    try:
                        # Commit the transaction using the connection, not the cursor
                        cursor.connection.commit()
                    except Exception as e:
                        print(e)
                        return jsonify({"error": "Failed to commit the transaction"}), 500
                    
                    return jsonify({"message": "User registered successfully", "user_id": user_id}), 201
            except psycopg2.IntegrityError:
                return jsonify({"error": "User with this email already exists"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@auth_bp.route('/login', methods=['POST'])
def login():
    """Log in a user and return a JWT token."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    query = """
    SELECT users.id, users.password_hash, roles.role_name 
    FROM users
    INNER JOIN roles ON users.role_id = roles.id
    WHERE users.email = %s;
    """
    with get_db_cursor() as cursor:
        cursor.execute(query, (email,))
        user = cursor.fetchone()

    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_jwt(user['id'], user['role_name'])
    return jsonify({"token": token, "role": user['role_name']}), 200



@auth_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_users():
    """Fetch all users (admin-only access)."""
    if check_token_validity()['jti'] not in current_app.jwt_blocklist:
        try:
            current_user = json.loads(get_jwt_identity())

            # Checking if the user has admin privileges
            if current_user.get('role') != 'admin':
                return jsonify({"error": "Unauthorized"}), 403

            # Query to fetch all users along with their role names
            query = """
            SELECT users.id, users.username, users.email, roles.role_name
            FROM users
            JOIN roles ON users.role_id = roles.id;
            """

            try:
                with get_db_cursor() as cursor:
                    cursor.execute(query)
                    users = cursor.fetchall()

                formatted_users = [dict(user) for user in users]
                # print(formatted_users)

                # Respond with the formatted list of users
                return jsonify({"users": formatted_users}), 200
            except Exception as e:  
                return jsonify({"error": str(e)}), 500

        except Exception as e:
            print(f"Error fetching users: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
    else:
        return jsonify({"error": "Invalid token"}), 401



@auth_bp.route('/admin/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_role(user_id):
    current_user = json.loads(get_jwt_identity())
    if current_user['role'] != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    new_role = data.get('role')
    valid_roles = ['admin', 'doctor', 'technician']

    if new_role not in valid_roles:
        return jsonify({"message": "Invalid role"}), 400

    # Fetch the role_id for the given role name
    with get_db_cursor() as cursor:
        cursor.execute("SELECT id FROM roles WHERE role_name = %s", (new_role,))
        role_data = cursor.fetchone()

    if not role_data:
        return jsonify({"message": f"Role '{new_role}' does not exist in the database"}), 400

    role_id = role_data['id']

    # Update the user's role_id in the users table
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE users SET role_id = %s WHERE id = %s", (role_id, user_id))
        cursor.connection.commit()

    return jsonify({"message": "Role updated successfully"})



@auth_bp.route("/logout", methods=["POST"])
def logout():
    """Logout endpoint to revoke a token."""
    auth_header = request.headers.get("Authorization")
    # print(auth_header)
    if not auth_header:
        return jsonify({"message": "Authorization header missing"}), 401

    try:
        # Decode the token to get its jti
        token = auth_header.split(" ")[1]
        decoded_token = decode_jwt(token, current_app.config["JWT_SECRET_KEY"])
        jti = decoded_token["jti"]

        current_app.jwt_blocklist.add(jti)
        # print(current_app.jwt_blocklist)
        return jsonify({"message": "Logged out successfully"}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 401
    
    
    
def check_token_validity():
    """
    Function to check if the token in the request is valid.
    Returns the decoded token if valid, else raises an error.
    """
    auth_header = request.headers.get("Authorization")
    # print(auth_header)
    if not auth_header:
        return jsonify({"message": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        decoded_token = decode_jwt(token, current_app.config["JWT_SECRET_KEY"])
        # print(decoded_token)
        return decoded_token
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
    
    
@auth_bp.route('/add_new_report', methods=['POST'])
@jwt_required()
def add_new_report():
    try:
        data = request.json
        # print(data)
        return jsonify({"message": "Report added successfully"}, data), 200
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 400