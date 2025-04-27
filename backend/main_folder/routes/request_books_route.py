from flask import Blueprint
from main_folder.controllers.request_books_controller import get_all_book_request, get_user_requests,update_request_status,request_book 


# Create the Blueprint
request_book_bp = Blueprint("request_book_bp", __name__)



# ============== User sends request ====================
# ============== USER SENDS REQUEST ====================
request_book_bp.route("/request-book", methods=["POST"]) (request_book)



# ============== User view their own request =================
# ============ GET USER REQUEST THROUGH EMAIL ===================
request_book_bp.route("/user/book-request/<email>", methods=["GET"]) (get_user_requests)



# ========== Admin fetch all requests ===================
# =========== GET ALL REQUESTS ==========================
request_book_bp.route("/admin/book-request", methods=["GET"]) (get_all_book_request)



# ============= Admin approves / reject request ====================
# =========== UPDATE STATUS ROUTE =========================
request_book_bp.route("/admin/book-request/<request_id>", methods=["PUT"]) (update_request_status)