from main_folder.models.book_model import get_all_books, get_book_by_id, create_book, udpate_book_details, search_book, delete_books
from flask import request, jsonify


# ==========================================================================
# Get all the Books
# ==========================================================================
def get_all_books_controller():
    books = get_all_books()
    return jsonify(books), 200


# ==========================================================================
# Get Book by ID 
# ==========================================================================
def get_book_id_controller(book_id):
    book = get_book_by_id(book_id)
    if book:
        return jsonify(book), 200
    return jsonify({"error", "book not found"}), 404


# ==========================================================================
# Create the book 
# ==========================================================================
def create_book_controller():
    data = request.json

    required = ["title", "author", "isbn", "category", "subject", "genre"]

    if not all(field in data for field in required):
        return jsonify({"error": "All Fields are required"}), 400
    
    book_id = create_book(
        title = data['title'],
        author = data['author'],
        isbn = data['isbn'],
        category = data['category'],
        subject = data['subject'],
        genre = data['genre']
    )

    return jsonify({"message": "Book created", "book_id": book_id}), 201


# ==========================================================================
# Update the Book details
# ==========================================================================
def update_book_controller(book_id):
    data = request.json
    result = udpate_book_details(book_id, data)

    if result.modified_count > 0:
        return jsonify({"message": "book updated"}), 200
    return jsonify({"error": "book not found or no changes"}), 404


# ==========================================================================
# Delete the Book
# ==========================================================================
def delete_book_controller(book_id):
    result = delete_books(book_id)

    if result.deleted_count > 0:
        return jsonify({"message": "Book Deleted"}), 200
    return jsonify({"error": "book not found"}), 404


# =========================================================================
# Search Book
# =========================================================================
def search_book_controller():
    query = request.args.get("query", "")
    if not query:
        return jsonify({"error": "Query is required"}), 400
    
    books = search_book(query)
    return jsonify(books), 200