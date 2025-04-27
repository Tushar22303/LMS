from flask import jsonify, request
from main_folder.models.user_model import create_user, find_by_email, get_all_user, update_user_profile, delete_user_profile
from flask_jwt_extended import create_access_token
from datetime import datetime, timezone, timedelta
from main_folder.app import bcrypt


# ADMIN Credentials
ADMIN = [
    {
        "name": "Tushar Prajapati",
        "email": "tusharprajapati@gmail.com",
        "password": bcrypt.generate_password_hash("@1010Tushar_22").decode("utf-8"),
        "gender": "Male",
        "created_at": datetime.now(timezone.utc),
        "role": "admin"
    },
    {
        "name": "Mitul Patel",
        "email": "mitul.library@uni.ac.in",
        "password": bcrypt.generate_password_hash("mitul_patel@1010").decode("utf-8"),
        "gender": "Male",
        "created_at": datetime.now(timezone.utc),
        "role": "admin"
    }
]


# =========================================================================
# Register Users
# =========================================================================
def register_user(data):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    gender = data.get("gender")

    # Check for validations
    if not all([name, email, password, gender]):
        return jsonify({"error": "All Fields are required."}), 400
    
    # Check if Email Already exists or not
    if find_by_email(email):
        return jsonify({"error":"Email Already Exists!"}), 400
    

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user_id = create_user(name, email, hashed_password, gender)

    return jsonify({"message": "User Registered Successfully!", "user_id": user_id}), 201



# ===================================================================
# Login -> Admin / User
# ===================================================================
def login_user(data):
    email = data.get("email")
    password = data.get("password")

    # Validations
    if not all([email, password]):
        return jsonify({"error": "Email and Password both are required."}), 400
    
    # Check for Admin Login
    for admin in ADMIN:
        if admin["email"] == email:
            if bcrypt.check_password_hash(admin['password'], password):
                access_token = create_access_token(
                    identity=email,
                    additional_claims={"role": "admin"},
                    expires_delta=timedelta(hours=12)
                )
                return jsonify({
                    "token": access_token,
                    "name": admin["name"],
                    "email": admin["email"],
                    "gender": admin["gender"],
                    "role": "admin",
                    "created_at": admin["created_at"].isoformat()
                }), 200
            else:
                return jsonify({"error": "Invalid Credentials."}), 401
         
    
    # Check for User Login
    user = find_by_email(email)
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid Credentials."}), 401
    

    role = user.get("role", "user")
    access_token = create_access_token(
        identity=str(user["_id"]),
        additional_claims={"role": role},
        expires_delta=timedelta(hours=12)
    )

    return jsonify({
        "token": access_token,
        "role": role,
        "name": user["name"],
        "email": user["email"],
        "user_id": str(user["_id"])
    }), 200



# =====================================================================
# Logout user (stateless - client handles the token deletion)
# =====================================================================
def logout_user():
    return jsonify({"message": "Logged out successfully"}), 200



# =====================================================================
# Get all users
# =====================================================================
def get_all_users_controller():
    users = get_all_user()
    return jsonify(users), 200



# =====================================================================
# Update the user profile
# =====================================================================
def update_user_controller(user_id):
    data = request.json
    result = update_user_profile(user_id, data)

    if result.modified_count > 0:
        return jsonify({"message": "user updated"}), 200
    return jsonify({"error": "user not found or no changes"}), 404


# =====================================================================
# delete the user profile
# =====================================================================
def delete_user_controller(user_id):
    result = delete_user_profile(user_id)

    if result.deleted_count > 0:
        return jsonify({"message": "User Deleted"}), 200
    return jsonify({"error": "user not found"}), 404



# =====================================================================
# Get the User Profile by email
# =====================================================================
def get_user_by_email_controller(email):
    user = find_by_email(email)

    if not user:
        return jsonify({"error": "user not found"}), 404
    
    user["_id"] = str(user["_id"])
    user.pop("password", None)
    return jsonify(user), 200



# =====================================================================
# Get the Admin Profile by email
# =====================================================================
def get_admin_by_email(email):
    admin = next((a for a in ADMIN if a["email"] == email), None)
    if admin:
        return jsonify({
            "name": admin["name"],
            "email": admin["email"],
            "gender": admin["gender"],
            "role": admin["role"],
        }), 200
    return jsonify({"error": "Admin not found"}), 404