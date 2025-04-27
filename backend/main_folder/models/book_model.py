from main_folder.database import mongo
from datetime import datetime, timezone
from bson import ObjectId


# Function to add the book in the Database
def create_book(title, author, isbn, category, subject, genre):
    book = {
        "title": title,
        "author": author,
        "isbn": isbn,
        "category": category,
        "subject": subject,
        "genre": genre,
        "created_at": datetime.now(timezone.utc)            
    }

    result = mongo.db.books.insert_one(book)
    return str(result.inserted_id)



# Function to get the book by id
def get_book_by_id(book_id):
    return mongo.db.books.find_one({"_id": ObjectId(book_id)})



# Function to get all the books
def get_all_books():
    books = list(mongo.db.books.find())

    for index, book in enumerate(books, start=1):
        book["_id"] = str(book["_id"])
        book["book_id"] = f"B-{str(index).zfill(3)}"

    return books



# Function to update the Book details
def udpate_book_details(book_id, updated_fields):
    return mongo.db.books.update_one(
        {"_id": ObjectId(book_id)},
        {"$set": updated_fields}
    )



# Function to Delete the Book
def delete_books(book_id):
    return mongo.db.books.delete_one({"_id": ObjectId(book_id)})



# Function to search the books by category, genre or author
def search_book(query):
    result = {
        "$or": [
            {"title": {"$regex": query, "$options": "i"}},
            {"author": {"$regex": query, "$options": "i"}},
            {"genre": {"$regex": query, "$options": "i"}},
            {"category": {"$regex": query, "$options": "i"}},
        ]
    }

    return list(mongo.db.books.find(result))