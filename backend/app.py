from flask import Flask
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
CORS(app, origins=["http://localhost:5173"])
if __name__ == '__main__':
    app.run(debug=True)
