from main_folder.models.return_book_model import create_return_book
from flask import request, jsonify
from main_folder.database import mongo
from bson import ObjectId


# ============================================================================
# Return Book Controller
# ============================================================================
def return_book():
    data = request.get_json()
    try:
        required_fields = ["book_id", "user_name", "title", "author", "category", "subject", "issueDate", "returnDate"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "All fields are required"}), 400

        return_id = create_return_book(
            book_id=data["book_id"],
            user_name=data["user_name"],
            title=data["title"],
            author=data["author"],
            category=data["category"],
            subject=data["subject"],
            issueDate=data["issueDate"],
            returnDate=data["returnDate"]
        )

        # Mark the book as returned in the issue_books collection
        mongo.db.issue_books.update_one(
            {"book_id": ObjectId(data["book_id"]), "status": "issued"},
            {"$set": {"status": "returned"}}
        )

        return jsonify({"message": "Book Returned Successfully", "return_id": return_id}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

    except Exception as e:
        return jsonify({"error": f"Something went wrong: {str(e)}"}), 500