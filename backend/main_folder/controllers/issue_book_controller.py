from main_folder.models.issue_book_model import add_issue_book, get_all_issued_books, get_issued_books_by_user
from flask import request, jsonify


# ========================================================================
# Add the Issue Book Controller
# ========================================================================
def add_issue_book_controller():
    data = request.get_json()

    required = ["user_id", "name", "book_id", "title", "issueDate", "returnDate"]

    if not all(field in data for field in required):
        return jsonify({"error": "All Fields are required"}), 400
    
    try:
        issue_id = add_issue_book(
            user_id = data["user_id"],
            name = data["name"],
            book_id = data["book_id"],
            title = data["title"],
            issueDate = data["issueDate"],
            returnDate = data["returnDate"],
        )

        return jsonify({"message": "Book Issued Successfully", "issue_id": issue_id}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

    except Exception as e:
        return jsonify({"error": f"Something went wrong: {str(e)}"}), 500
    


# ========================================================================
# Get All the Issued Book Controller ( ADMIN )
# ========================================================================
def get_all_issued_book_controller():
    try:
        issued_books = get_all_issued_books()
        return jsonify(issued_books), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# ========================================================================
# Get Issued Book by User Controller
# ========================================================================
def get_issued_book_by_user_controller(user_id):
    try:
        issued_books = get_issued_books_by_user(user_id)
        return jsonify(issued_books), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500