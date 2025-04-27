import os 
from dotenv import load_dotenv


# Load the environment variable from .env file
load_dotenv()


class Config:
    FLASK_DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"

    # Flask Core Config
    SECRET_KEY = os.getenv("SECRET_KEY")
    FLASK_ENV = os.getenv("FLASK_ENV", "development")


    # MongoDB URI
    MONGO_URI = os.getenv("MONGO_URI")


    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


    # CORS -> for frontend communication
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000")