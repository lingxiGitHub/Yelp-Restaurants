from flask import Blueprint, request, session, jsonify

from flask_login import current_user, login_required

from app.models import db,Review, Restaurant, User, ReviewImage

from .restaurant_routes import restaurant_routes

from ..forms.review_image_form import ReviewImageForm
from ..forms.review_form import ReviewForm
from sqlalchemy.sql import func

review_routes = Blueprint('reviews', __name__)

# get all reviews
@review_routes.route('')
def get_all_reviews():
  reviews = Review.query.all()
  data = [review.to_dict() for review in reviews]
  # return jsonify(data)
  return {"reviews": data}
  # return render_template("all_reviews.html", reviews=reviews)
  # return "all reviews"


# get current user's reviews
@review_routes.route('/current')
@login_required
def get_reviews_by_current_user():
  reviews = Review.query.filter(Review.user_id == current_user.id)
  data = []

  for review in reviews:
    restaurant = Restaurant.query.filter(Restaurant.user_id == current_user.id).all()
    reviewImage = ReviewImage.query.filter(ReviewImage.review_id == review.id)
    oneReviewInfor = {}
    oneReviewInfor["user"] = current_user.to_dict()
    oneReviewInfor["restaurant"] = restaurant[0].to_dict()
    oneReviewInfor["reviewImages"] = [revImage.to_dict() for revImage in reviewImage]
    oneReviewInfor.update(review.to_dict())
    data.append(oneReviewInfor)
  return {"reviews": data}

# get reviews by restaurant's id
@restaurant_routes.route('/<int:id>/reviews', methods=['GET'])
def get_reviews_by_restaurant_id(id):
  restaurant = Restaurant.query.get(id)
  if not restaurant:
    return {"errors": ["restaurant couldn't be found"]}, 404

  reviews = Review.query.filter(Review.restaurant_id == id).all()
  # print("the restaurant's reviews********", reviews[0].to_dict())

  data = []
  for review in reviews:
    user = User.query.get(review.user_id)

    reviewImage = ReviewImage.query.filter(ReviewImage.review_id == review.id).all()
    oneReviewInfo = {}
    oneReviewInfo["user"] = user.to_dict()
    oneReviewInfo["reviewImages"] = [image.to_dict() for image in reviewImage]
    oneReviewInfo["restaurant"] = restaurant.to_dict()
    oneReviewInfo.update(review.to_dict())
    data.append(oneReviewInfo)

  return {"reviews" : data}


# add an image for a review
@review_routes.route('/<int:id>/images', methods=["POST",'GET'])
@login_required
def create_image_by_review_id(id):

  review = Review.query.get(id)
  if not review:
    return {"error": ["Review couldn't be found"]}, 404

  images = ReviewImage.query.filter(ReviewImage.review_id == id).all()
  # print("**************", len(images))
  if len(images)>=10:
    return {"message": ["Maximum number of images for this resource was reached"]}, 403

  form = ReviewImageForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    reviewImage = ReviewImage(
      review_id = id,
      url = request.get_json()["url"]
    )
    db.session.add(reviewImage)
    db.session.commit()
    return reviewImage.to_dict()
  elif form.errors:
    return form.errors



## Create a review by restaurant's id
@restaurant_routes.route('/<int:id>/reviews', methods=["POST", "GET"])
@login_required
def create_review_by_restaurant_id(id):
  restaurant = Restaurant.query.get(id)

  if (restaurant.user_id == current_user.id):
    return {"errors": ["User can't add review on his own restaurant"]}, 403

  if not restaurant:
    return {"errors": ["restaurant couldn't be found"]}, 404

  review = Review.query.filter(Review.restaurant_id == id, Review.user_id == current_user.id).all()

  if len(review) > 0:
    return {"errors": ["User already has a review for this restaurant"]}, 403

  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    review = Review(
      user_id = int(current_user.id),
      restaurant_id = id,
      review = request.get_json()["review"],
      rating = request.get_json()["rating"],
    )

    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  if form.errors:
    print("%%%%%% errors form routes ", form.errors)
    return {"errors": {"review": "Review text is required",
    "rating": "Rating must be an integer from 1 to 5",}}, 400



# Edit a review
@review_routes.route('/<int:id>', methods=["PUT", "GET"])
@login_required
def create_review_by_restaurant_id(id):

  review = Review.query.get(id)
  # print("!!!! backend review", review.to_dict())

  if not review:
    return {"errors": ["review couldn't be found"]}, 404

  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  # print("******************request body", request.get_json())
  if form.validate_on_submit():
    review.review = request.get_json()["review"]
    review.rating = request.get_json()["rating"]
    review.updatedAt = func.now()
    db.session.commit()
    return review.to_dict()
  elif form.errors:
    return {"errors": {"review": "Review text is required",
    "stars": "Stars must be an integer from 1 to 5",}}, 400


# Delete a review
@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
  review = Review.query.get(id)
  # print("#####################", review.to_dict() )
  if review is None:
    return {"errors": ["Review couldn't be found"]}, 404
  db.session.delete(review)
  db.session.commit()
  return {"message": ["Successfully deleted"]},200
