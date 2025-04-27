from flask import Flask, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from main_folder.config import Config
from main_folder.database import init_db



bcrypt = Bcrypt()
jwt_manager = JWTManager()


def create_app():
    app = Flask(__name__,)

    # Load configuration from config.py
    app.config.from_object(Config)

    # Initialize the database
    init_db(app)

    # Initialize the JWT
    jwt_manager.init_app(app)

    # Initialize the Bcrypt
    bcrypt.init_app(app)

    CORS(app, origins=app.config["CORS_ORIGINS"], supports_credentials=True)


    # Importing routes and blueprints
    from main_folder.routes.auth_routes import auth_bp
    from main_folder.routes.book_route import book_bp
    from main_folder.routes.issue_book_route import issue_book_bp
    from main_folder.routes.return_book_route import return_book_bp
    from main_folder.routes.request_books_route import request_book_bp


    app.register_blueprint(auth_bp)
    app.register_blueprint(book_bp)
    app.register_blueprint(issue_book_bp)
    app.register_blueprint(return_book_bp)
    app.register_blueprint(request_book_bp)

    return app