from main_folder.database import mongo
from datetime import datetime, timezone
from bson import ObjectId
from bson.errors import InvalidId
from flask import jsonify


# Function to find the user by email
def find_by_email(email):
    return mongo.db.users.find_one({"email": email})


# Function to get all the users
def get_all_user():
    users = list(mongo.db.users.find())

    for index, user in enumerate(users, start=1):
        user["_id"] = str(user["_id"])
        user["user_id"] = f"U-{str(index).zfill(3)}"

    return users


# Store the User in the Database
def create_user(name, email, hashed_password, gender):
    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "gender": gender,
        "role": "user",      # by default - user
        "created_at": datetime.now(timezone.utc)
    }

    result = mongo.db.users.insert_one(user)
    return str(result.inserted_id)


# Function to get the user by id
def get_user_by_id(user_id):
    return mongo.db.users.find_one({"_id": ObjectId(user_id)})


# Function to Update user profile
def update_user_profile(user_id, updated_field):
    try:
        return mongo.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": updated_field}
        )
    except InvalidId:
        return {"error": "Invalid user ID format"}


# Function to Delete the user profile
def delete_user_profile(user_id):
    return mongo.db.users.delete_one({"_id": ObjectId(user_id)})



# =========================================================================================================
# Function to get the admin dashboard stats
def get_admin_dashboard_stats():
    try:
        total_users = mongo.db.users.count_documents({})
        total_books = mongo.db.books.count_documents({})
        total_issued = mongo.db.issue_books.count_documents({"status": "issued"})
        total_returned = mongo.db.issue_books.count_documents({"status": "returned"})

        return jsonify({
            "totalUsers": total_users,
            "totalBooks": total_books,
            "totalIssued": total_issued,
            "totalReturned": total_returned
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500