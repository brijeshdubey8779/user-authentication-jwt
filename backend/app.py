from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from config import Config
from flask_cors import CORS
import os

app = Flask(__name__)
app.config.from_object(Config)

jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ALGORITHM'] = os.getenv('JWT_ALGORITHM')
os.getenv('JWT_SECRET_KEY')
# print(f"JWT_SECRET_KEY: {os.getenv('JWT_SECRET_KEY')}")


@jwt.invalid_token_loader
def invalid_token_callback(callback):
    try:
        print(f"Invalid token: {callback}")
        return jsonify({"error": "Invalid token"}), 401
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Invalid token"}), 418

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
CORS(app, origins=["http://localhost:5173"])

if __name__ == '__main__':
    app.run(debug=True)
