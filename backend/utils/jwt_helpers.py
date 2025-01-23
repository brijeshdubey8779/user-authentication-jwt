from flask_jwt_extended import create_access_token
# import jwt
# from datetime import datetime, timedelta, timezone
# from flask import json
# import os
# from dotenv import load_dotenv

# load_dotenv()

# JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
# algorithm = os.getenv('JWT_ALGORITHM')

def generate_jwt(user_id, role):
    import json
    identity = json.dumps({"id": user_id, "role": role})
    return create_access_token(identity=identity)

# def generate_jwt(user_id, role, secret_key=JWT_SECRET_KEY, algorithm='HS256'):
#     payload = {
#         "id": user_id,
#         "role": role,
#         "exp": datetime.now(timezone.utc) + timedelta(hours=1),  
#         "iat": datetime.now(timezone.utc),  
#     }
#     return jwt.encode(payload, secret_key, algorithm=algorithm)


# import jwt

# def decode_jwt(token, secret_key=JWT_SECRET_KEY, algorithms=['HS256']):
#     try:
#         decoded = jwt.decode(token, secret_key, algorithms=algorithms)
#         print(decoded)
#         return decoded
#     except jwt.ExpiredSignatureError:
#         return {"error": "Token has expired"}
#     except jwt.InvalidTokenError:
#         return {"error": "Invalid token"}
