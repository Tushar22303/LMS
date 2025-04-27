from main_folder.controllers.book_controller import create_book_controller, delete_book_controller, get_all_books_controller,get_book_id_controller, search_book_controller, update_book_controller
from flask import Blueprint


# Create the Book Blueprint 
book_bp = Blueprint("book_bp", __name__)


# ============== GET ALL BOOKS ====================
book_bp.route('/books', methods=["GET"])(get_all_books_controller)


# ============== GET ALL BOOKS BY ID ====================
book_bp.route('/books/<book_id>', methods=["GET"])(get_book_id_controller)


# ============== ADD THE BOOK ====================
book_bp.route('/books', methods=["POST"])(create_book_controller)


# ============== UPDATE BOOK DETAILS ===================
book_bp.route('/books/<book_id>', methods=["PUT"])(update_book_controller)


# ============== DELETE BOOK ====================
book_bp.route('/books/<book_id>', methods=["DELETE"])(delete_book_controller)


# ============== SEARCH BOOK ====================
book_bp.route('/books/search', methods=["GET"])(search_book_controller)

