from main_folder.controllers.issue_book_controller import add_issue_book_controller, get_all_issued_book_controller,get_issued_book_by_user_controller
from flask import Blueprint 
from main_folder.models.issue_book_model import get_history

# create the issue book Blueprint
issue_book_bp = Blueprint("issue_book_bp", __name__)

# ADMIN and GENERAL

# ============= ISSUE BOOK ROUTE =====================
issue_book_bp.route('/issue-books', methods=["POST"])(add_issue_book_controller)


# ============ GET ALL ISSUED BOOK ROUTE =============
issue_book_bp.route("/issue-books", methods=["GET"])(get_all_issued_book_controller)


# USER DASHBOARD (SPECIFIC USER)

# ========== GET ISSUED BOOKS BY USER ROUTER =================
issue_book_bp.route("/my-issue-books/<user_id>", methods=["GET"])(get_issued_book_by_user_controller)


# ============== GET HISTORY ===============================
issue_book_bp.route("/history", methods=["GET"])(get_history)