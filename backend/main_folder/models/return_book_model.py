from main_folder.database import mongo
from datetime import datetime, timezone


# Function to store the return books in the database
def create_return_book(book_id, user_name, title, author, category, subject, issueDate, returnDate):
    try:
        return_book = {
            "book_id": book_id,
            "user_name": user_name,
            "title": title,
            "author": author,
            "category": category,
            "subject": subject,
            "issueDate": issueDate,
            "returnDate": returnDate,
            "returned_at": datetime.now(timezone.utc)
        }

        return_book_id = mongo.db.return_book.insert_one(return_book)
        return str(return_book_id.inserted_id)
    except ValueError as ve:
        raise ve
    except Exception as e:
        raise Exception(f"Failed to return book: {str(e)}")
