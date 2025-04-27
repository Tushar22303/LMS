from main_folder.controllers.return_book_controller import return_book
from flask import Blueprint


# creating the blueprint
return_book_bp = Blueprint("return_book_bp", __name__)


# ========= RETURN BOOK =======================
return_book_bp.route("/return-book", methods=["POST"]) (return_book)