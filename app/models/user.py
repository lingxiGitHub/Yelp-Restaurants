from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
# from .review import Review
# from .restaurant import Restaurant

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), nullable=False, unique=True)
    email_address = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False,
                          server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          server_default=func.now())
    portrait = db.Column(db.String(255),  nullable=False, default="https://static.vecteezy.com/system/resources/previews/016/412/547/non_2x/cute-happy-boy-doodle-portrait-smiling-curly-child-illustration-hand-drawing-avatar-male-baby-face-vector.jpg")

    reviews = db.relationship("Review", back_populates="user")
    restaurants = db.relationship("Restaurant", back_populates="user")
    restaurant_images = db.relationship(
        "RestaurantImage", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        # print("self password",self.password)
        # print("password input", password)
        checked_pw = check_password_hash(self.password, password)
        # print(checked_pw)
        return checked_pw

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email_address': self.email_address,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'portrait':self.portrait
        }

    def to_dict_express(self, reviews):
        return {
            'id': self.id,
            'username': self.username,
            'email_address': self.email_address,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'reviews': reviews
        }
