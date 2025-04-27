from flask import jsonify
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt


# ======================================================================
# Middle-ware to allow only Admins
# ======================================================================
def admin_required(func):
    @wraps(func)
    def wrapper_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            claims = get_jwt()

            if claims.get("role") != "admin":
                return jsonify({"error": "Admin access only"}), 403
            
            return func(*args, **kwargs)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 401
        
    return wrapper_function


# ======================================================================
# Middle-ware to allow only user
# ======================================================================
def user_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            claims = get_jwt()

            if claims.get("role") != "user":
                return jsonify({"error": "User access only"}), 403

            return func(*args, **kwargs)

        except Exception as e:
            return jsonify({"error": str(e)}), 401

    return wrapper