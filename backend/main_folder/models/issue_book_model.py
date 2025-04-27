from main_folder.database import mongo
from bson import ObjectId
from datetime import datetime
from flask import jsonify


# Function to add the issue book to the database
def add_issue_book(user_id, book_id, name, title, issueDate, returnDate):
    try:
        # Convert to datetime for validation
        issue_date_obj = datetime.strptime(issueDate, "%Y-%m-%d")
        return_date_obj = datetime.strptime(returnDate, "%Y-%m-%d")

        if return_date_obj <= issue_date_obj:
            raise ValueError("Return date must be after issue date.")
        
        # Prevent IssueDate from the past
        if issue_date_obj.date() < datetime.today().date():
            raise ValueError("Issue date cannot be in the past.")
        
        # Duplicate issue book
        existing_book = mongo.db.issue_books.find_one({
            "user_id": ObjectId(user_id),
            "book_id": ObjectId(book_id),
            "status": "issued"
        })

        if existing_book:
            raise ValueError("You have already issued this book and it's not yet returned.")


        issueBook = {
            "user_id": ObjectId(user_id),
            "name": name,
            "book_id": ObjectId(book_id),
            "title": title,
            "issueDate": issueDate,
            "returnDate": returnDate,
            "status": "issued",
        }

        result = mongo.db.issue_books.insert_one(issueBook)
        return str(result.inserted_id)

    except ValueError as ve:
        raise ve  # You can catch and return this in the controller
    except Exception as e:
        raise Exception("Failed to issue book: " + str(e))



# Function to get all the issued books (Admin)
def get_all_issued_books():
    issued_books = mongo.db.issue_books.find()
    issued_book_list = []

    for book in issued_books:
        issued_book_list.append({
            "id": str(book.get("_id")),
            "user_id": str(book.get("user_id")),
            "name": book.get("name"),
            "book_id": str(book.get("book_id")),
            "title": book.get("title"),
            "issueDate": book.get("issueDate"),
            "returnDate": book.get("returnDate"),
            "status": book.get("status", "issued"),
        })

    return issued_book_list



# Function to get issued book ny user
def get_issued_books_by_user(user_id):
    issued_books = list(mongo.db.issue_books.find({
        "user_id": ObjectId(user_id),
        "status": "issued"
    }))
    issued_books_list_user = []

    for issued in issued_books:
        # Look up details from the books collection
        book = mongo.db.books.find_one({"_id": issued["book_id"]})

        if book:
            issued_books_list_user.append({
                "book_id": str(book["_id"]),
                "title": book.get("title"),
                "author": book.get("author"),
                "subject": book.get("subject"),
                "category": book.get("category"),
                "issueDate": issued.get("issueDate"),
                "returnDate": issued.get("returnDate"),
            })
    return issued_books_list_user



# Function to get the history of the books
def get_history():
    issued_books = mongo.db.issue_books.find()
    history = []
    for book in issued_books:
        history.append({
            "user_id": str(book.get("user_id")),
            "name": book.get("name"),
            "book_id": str(book.get("book_id")),
            "title": book.get("title"),
            "issueDate": book.get("issueDate"),
            "returnDate": book.get("returnDate"),
            "status": book.get("status", "issued"),
        })

    return jsonify(history)