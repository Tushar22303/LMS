from flask import jsonify, request
from main_folder.database import mongo
from bson import ObjectId
from datetime import datetime, timezone, timedelta

# Auto Expires after 7 days
EXPIRY_DAYS = 7

# Helper function for cutoff date
def get_expiry_cutoff():
    return datetime.utcnow() - timedelta(days=EXPIRY_DAYS)


# ============================================================================
# Book Request (User Send request) (POST : request)
# ============================================================================
def request_book():
    try:
        data = request.get_json()

        required_fields = ["book_id", "title", "subject", "name", "email"]
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing field: {field}"}), 400

        # Check for duplicate request
        existing = mongo.db.request_books.find_one({
            "book_id": data["book_id"],
            "email": data["email"],
            "status": "pending"
        })

        if existing:
            return jsonify({"message": "You have already requested these book but it is stille pending"}), 400

        new_request = {
            "book_id": data["book_id"],
            "title": data["title"],
            "subject": data["subject"],
            "name": data["name"],
            "email": data["email"],
            "request_date": datetime.now(timezone.utc),
            "status": "pending"
        }

        request_id = mongo.db.request_books.insert_one(new_request)
        return jsonify({"message": "Book request submitted", "request_id": ObjectId(request_id)}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# ============================================================================
# Get all Book Request (Admin fetch all request)
# ============================================================================  
def get_all_book_request():
    try:
        cutoff = get_expiry_cutoff()
        requests = list(mongo.db.request_books.find({
            "request_date": {"$gte": cutoff}
        }))
        for r in requests:
            r["_id"] = str(r["_id"])
        return jsonify(requests), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# ============================================================================
# Update the Status of request (Admin approves / reject request)
# ============================================================================ 
def update_request_status(request_id):
    try:
        data = request.get_json()
        new_status = data.get("status")

        if new_status not in ["approved", "rejected"]:
            return jsonify({"error": "Invalid status"}), 400
        
        result = mongo.db.request_books.update_one(
            {"_id": ObjectId(request_id)}, 
            {"$set": {"status": new_status}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Request not found"}), 404
        
        return jsonify({"message": f"Request status updated to {new_status}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# ============================================================================
# Get user request (User view their own requests)
# ============================================================================ 
def get_user_requests(email):
    try:
        cutoff = get_expiry_cutoff()
        requests = list(mongo.db.request_books.find({"email": email, "request_date": {"$gte": cutoff}}))
        for r in requests:
            r["_id"] = str(r["_id"])
            r["request_date"] = r["request_date"].astimezone().strftime("%d %b %Y")
        return jsonify(requests), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500