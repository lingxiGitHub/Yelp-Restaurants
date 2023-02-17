from flask import Blueprint,jsonify,request,session
from flask_login import login_required, current_user
from app.models import User
from app.models import Restaurant
from app.models import Review
from app.models import RestaurantImage
from app.models import db
from app.forms import RestaurantForm
from app.forms import RestaurantImageForm
from sqlalchemy.sql import func

restaurant_routes = Blueprint('restaurants', __name__)


# ------------------------------------ search route -----------------------------------------

@restaurant_routes.route("/search/<keyword>")
def search_restaurant(keyword):
  restaurant_images= RestaurantImage.query.all()

  print(keyword)
  queried_restaurants = Restaurant.query.filter(Restaurant.name.ilike(f"%{keyword}%")).all()

  for restaurant in queried_restaurants:
    print(restaurant.id)
    restaurant.preview= None
    for image in restaurant_images:
       if image.restaurant_id == restaurant.id and image.preview == True:
        restaurant.preview=image.url


  data={
      "Restaurants":[{
      "id":restaurant.id,
      "user_id": restaurant.user_id,
      "name":restaurant.name,
      "price":restaurant.price,
      "address" : restaurant.address,
      "city" : restaurant.city,
      "state" :restaurant.state,
      "zipcode": restaurant.zipcode,
      "country":restaurant.country,
      "phone_number" : restaurant.phone_number,
      "description" : restaurant.description,
      "website":restaurant.website,
      # "avgRating": round(restaurant.aveRating,2),
      "previewImage": restaurant.preview
    } for restaurant in queried_restaurants],
    # "page":4,"size":5
    }

  return data

  return {"keyword": [keyword.to_dict() for keyword in queried_restaurants]}

  # ------------------------------------ search route -----------------------------------------


# Get all Restaurants
@restaurant_routes.route('/')
def restaurants():
    restaurants = Restaurant.query.all()
    reviews=Review.query.all()
    restaurant_images= RestaurantImage.query.all()


    # rating=0
    # review_count=0
    
    for restaurant in restaurants:
      print("restaurant", restaurant.to_dict())
      restaurants_reviews = Review.query.filter(
          Review.restaurant_id == restaurant.id).all()
      print("!!!!!!!restaurants_reviews", restaurants_reviews)
      print("!!!! len",len(restaurants_reviews))
      if len(restaurants_reviews)==0:
        restaurant.aveRating=0
      rating = 0
      review_count = 0
      # aveRating = None
      for review in restaurants_reviews:
        
        print("%%%%%%%%%%",review.to_dict())
        review_count=review_count+1
        print("review_count", review_count)
        rating=rating+review.rating
        
        
        aveRating=rating/review_count
        print(aveRating)
        restaurant.aveRating=aveRating


    for restaurant in restaurants:
      print(restaurant.id)
      restaurant.preview= None
      for image in restaurant_images:
        if image.restaurant_id == restaurant.id and image.preview == True:
          restaurant.preview=image.url




    data={
      "Restaurants":[{
      "id":restaurant.id,
      "user_id": restaurant.user_id,
      "name":restaurant.name,
      "price":restaurant.price,
      "address" : restaurant.address,
      "city" : restaurant.city,
      "state" :restaurant.state,
      "zipcode": restaurant.zipcode,
      "country":restaurant.country,
      "phone_number" : restaurant.phone_number,
      "description" : restaurant.description,
      "website":restaurant.website,
      "avgRating": round(restaurant.aveRating,2),
      "previewImage": restaurant.preview
    } for restaurant in restaurants],
    # "page":4,"size":5
    }

    # print (reviewData)
    return data

#Get all Restaurant owned by the Current User

# @restaurant_routes.route('/current')
# def restaurants_current():
#     user_id=current_user.id
#     print("----->id",user_id)
#     restaurants = Restaurant.query.filter(Restaurant.user_id==user_id).all()
#     reviews=Review.query.all()
#     restaurant_images= RestaurantImage.query.all()


#     rating=0
#     review_count=0
#     for restaurant in restaurants:
#       print(restaurant.id)
#       for review in reviews:
#         if review.restaurant_id == restaurant.id:
#           review_count=review_count+1
#           rating=rating+review.rating
#           if review_count == 0:
#             avgStarRating = 0
#           else:
#             aveRating=rating/review_count

#       print(aveRating)
#       restaurant.aveRating=aveRating


#     for restaurant in restaurants:
#       print(restaurant.id)
#       for image in restaurant_images:
#         if image.preview == True:
#           restaurant.preview=image.url

#     data={
#       "Restaurants":[{
#       "restaurant_id":restaurant.id,
#       "user_id": restaurant.user_id,
#       "name":restaurant.name,
#       "price":restaurant.price,
#       "address" : restaurant.address,
#       "city" : restaurant.city,
#       "state" :restaurant.state,
#       "zipcode": restaurant.zipcode,
#       "country":restaurant.country,
#       "phone_number" : restaurant.phone_number,
#       "description" : restaurant.description,
#       "website":restaurant.website,
#       # "createdAt": "2021-11-19 20:39:36",
#       # "updatedAt": "2021-11-19 20:39:36",
#       "avgRating": round(restaurant.aveRating,2),
#       "previewImage": restaurant.preview
#     } for restaurant in restaurants]}

#     return data


#Get details of a Restaurant from an id
@restaurant_routes.route('/<int:id>')
def restaurants_by_id(id):
    SingleRestaurant = Restaurant.query.get(id)
    theUser=User.query.get(SingleRestaurant.user_id)
    # print("--->",theUser)
    images = RestaurantImage.query.filter(RestaurantImage.restaurant_id==id).all()
    PreviewImage=""
    for image in images:
        if image.preview == True:
            PreviewImage=image

    print("---->",images)

    reviews=Review.query.filter(Review.restaurant_id==id).all()
    numReviews=len(reviews)

    print("---->reviews",reviews)
    print("---->numReview",numReviews)



    total_rating=0
    for review in reviews:
      total_rating=total_rating+review.rating
    print("---->total_rating",total_rating)
    if numReviews ==0:
      avgStarRating=0
    else:
      avgStarRating=total_rating/numReviews


    data = {
      "id":id,
      "user_id": SingleRestaurant.user_id,
      "name":SingleRestaurant.name,
      "price":SingleRestaurant.price,
      "address" : SingleRestaurant.address,
      "city" : SingleRestaurant.city,
      "state" :SingleRestaurant.state,
      "zipcode": SingleRestaurant.zipcode,
      "country":SingleRestaurant.country,
      "phone_number" : SingleRestaurant.phone_number,
      "description" : SingleRestaurant.description,
      "website":SingleRestaurant.website,
      "website":"http://www.luavietkitchen.com",
      "User":{
        "id": theUser.id,
        "firstName": theUser.first_name,
        "lastName": theUser.last_name
      },
      "restaurantImages":[{
      "id": image.id,
      "url": image.url,
      "preview": image.preview} for image in images],
    #   "createdAt": "2021-11-19 20:39:36",
    #   "updatedAt": "2021-11-19 20:39:36" ,
       "numReviews": numReviews,
       "avgStarRating": round(avgStarRating,2),
    }

    return data


#Create a restaurant
@restaurant_routes.route('/', methods=["POST", "GET"])
# @login_required
def create_restaurant():

  form = RestaurantForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    restaurant = Restaurant(
      user_id = int(current_user.id),
      name = request.get_json()["name"],
      price = request.get_json()["price"],
      address = request.get_json()["address"],
      city = request.get_json()["city"],
      state = request.get_json()["state"],
      zipcode = request.get_json()["zipcode"],
      country = request.get_json()["country"],
      phone_number = request.get_json()["phone_number"],
      website = request.get_json()["website"],
      description = request.get_json()["description"],
    )


    db.session.add(restaurant)

    db.session.commit()
    return restaurant.to_dict()
  if form.errors:
    return form.errors

#Add an Image to a restaurant based on the restaurant's id
@restaurant_routes.route('/<int:restaurantId>/images', methods=["POST", "GET"])
@login_required
def create_restaurant_image(restaurantId):

    restaurant = Restaurant.query.get(restaurantId)
    if not restaurant:
      return {"errors": ["restaurant couldn't be found"]}, 404

    form = RestaurantImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
      restaurantImage = RestaurantImage(
           restaurant_id = int(restaurantId),
           url = request.get_json()["url"],
           preview = request.get_json()["preview"],
         )
      db.session.add(restaurantImage)
      db.session.commit()
      return restaurantImage.to_dict()
    else:
        return form.errors


#edit a restaurant
@restaurant_routes.route('/<int:restaurantId>', methods=["PUT", "GET"])
@login_required
def edit_restaurant_by_restaurant_id(restaurantId):
  restaurant = Restaurant.query.get(restaurantId)
  print("restaurant--->",restaurant.to_dict())
  print("current user id ---->",current_user.id)
  if not restaurant:
    return {"errors": ["restaurant couldn't be found"]}, 404

  form = RestaurantForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():

    restaurant.id=int(restaurantId)
    restaurant.user_id = int(current_user.id)
    restaurant.name = request.get_json()["name"]
    restaurant.price = request.get_json()["price"]
    restaurant.name = request.get_json()["name"]
    restaurant.address = request.get_json()["address"]
    restaurant.city = request.get_json()["city"]
    restaurant.state = request.get_json()["state"]
    restaurant.zipcode = request.get_json()["zipcode"]
    restaurant.country = request.get_json()["country"]
    restaurant.phone_number = request.get_json()["phone_number"]
    restaurant.website = request.get_json()["website"]
    restaurant.description = request.get_json()["description"]

    db.session.commit()
    return restaurant.to_dict()


  if form.errors:
    return form.errors

#Delete a restaurant
@restaurant_routes.route('/<int:restaurantId>', methods=["DELETE"])
@login_required
def delete_restaurant(restaurantId):
  restaurant = Restaurant.query.get(restaurantId)
  if not restaurant:
    return {"errors": ["Restaurant couldn't be found"]}, 404
  db.session.delete(restaurant)
  db.session.commit()
  return {"message": ["Restaurant Successfully deleted"]},200
