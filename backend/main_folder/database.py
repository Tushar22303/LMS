from flask_pymongo import PyMongo


# Create the PyMongo instance
mongo = PyMongo()


def init_db(app):

    # This will use the MONGO_URI defined in config.py
    mongo.init_app(app)


def get_collection(name):
    """
    Optional helper to access a MongoDB collection by name.

    Example: in controllers.py file
        users = get_collection('users')
        user = users.find_one({'email': 'test@example.com'})
    """
    return mongo.db[name]