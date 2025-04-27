from flask import Blueprint, request
from main_folder.controllers.auth_controller import login_user, logout_user, register_user, update_user_controller,delete_user_controller, get_all_users_controller, get_user_by_email_controller, get_admin_by_email
from main_folder.models.user_model import get_admin_dashboard_stats

# Create the Blueprint for auth
auth_bp = Blueprint("auth_bp", __name__)


# ============= REGISTER USER ====================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    return register_user(data)


# ============= LOGIN USER ====================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    return login_user(data)


# ============= LOGOUT USER ====================
@auth_bp.route("/logout", methods=["POST"])
def logout():
    return logout_user()


# ============= GET ALL USER ====================
auth_bp.route("/users", methods=["GET"])(get_all_users_controller)


# ============= UPDATE USER ====================
auth_bp.route("/users/<user_id>", methods=["PUT"])(update_user_controller)


# ============= DELETE USER ====================
auth_bp.route("/users/<user_id>", methods=["DELETE"])(delete_user_controller)


# ========== GET USER PROFILE BY EMAIL =================
auth_bp.route("/users/profile/<email>", methods=["GET"]) (get_user_by_email_controller)


# ========== GET ADMIN PROFILE =========================
auth_bp.route("/admin/profile/<email>", methods=["GET"]) (get_admin_by_email)


# ============= ADMIN DASHBOARD STATS =====================
auth_bp.route("/admin/dashboard/stats", methods=["GET"]) (get_admin_dashboard_stats)