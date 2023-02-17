from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Review
from app.forms.user_profile_form import UserProfileForm
from app.api.auth_routes import authenticate

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


#Get a User's Profile...return current user's profile

@user_routes.route('/get/<int:id>', methods=['GET'])
def get_user_profile(id):
    profile = User.query.filter(User.id == id).all()
    if not profile:
        return {'errors': ['No profile found']}, 401
    profile_list = []
    for prof in profile:
        user = User.query.get(id)
        reviews = Review.query.filter(Review.user_id == user.id).all()
        review_obj = [review.to_dict() for review in reviews]
        profile_list.append(prof.to_dict_express(review_obj))
    return jsonify(profile_list)


#Create a new user profile

@user_routes.route('/new', methods=['POST'])
@login_required
def new_profile():
    form = UserProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        new_profile=User(
            username = data['username'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            email_address = data['email_address']
        )
        db.session.add(new_profile)
        db.session.commit()
        reviews = Review.query.filter(Review.user_id == new_profile.id).all()
        review_obj = [review.to_dict() for review in reviews]
        user = User.query.get(new_profile.id)
        return jsonify(new_profile.to_dict_express(review_obj, user.to_dict()))
    return jsonify(form.errors)


#Edit a user profile

@user_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    if authenticate():
        form = UserProfileForm()
        profile = User.query.get(id)
        if not profile:
            return {'errors': ['The profile does not exist']}, 401
        form['csrf_token'].data = request.cookies['csrf_token']
        data = form.data
        if profile and form.validate_on_submit():
            profile.username = data['username']
            profile.first_name = data['first_name']
            profile.last_name = data['last_name']
            profile.email_address = data['email_address']
            db.session.commit()
            user = User.query.get(id)
            # reviews = Review.query.filter(Review.user_id == user.id).all()
            # review_obj = [review.to_dict() for review in reviews]
            return profile.to_dict()
        return form.errors


# Delete a user profile

@user_routes.route('/delete/<int:id>', methods=['Delete'])
@login_required
def delete_profile(id):
    if authenticate():
        profile = User.query.get(id)
        reviews = Review.query.filter(Review.user_id == user.id).all()
        if User:
            for review in reviews:
                db.session.delete(review)
                db.session.commit()
            db.session.delete(profile)
            db.session.commit()
            return jsonify("User profile and associated reviews have successfully been deleted")
        return {'errors': ['The profile does not exist']}, 401
    # if not profile:
    #     return {'errors': ['That profile does not exist']}, 401
    # db.session.delete(profile)
    # db.session.commit()
    # return jsonify("User profile has successfully been deleted")
