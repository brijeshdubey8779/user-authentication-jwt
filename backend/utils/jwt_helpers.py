from flask_jwt_extended import create_access_token

def generate_jwt(user_id, role):
    """Generate a JWT token."""
    return create_access_token(identity={"id": user_id, "role": role})
