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

resImage_routes = Blueprint('restaurantImages', __name__)

# delete restauant image by image id
@resImage_routes.route('/<int:imageId>', methods=["DELETE"])
@login_required
def delete_res_image(imageId):
    """
    Query for a restaurant image by id and delete that image
    """
  
    deleted_res_image = RestaurantImage.query.get(imageId)
    db.session.delete(deleted_res_image)
    db.session.commit()
    return {"message": "Successfully deleted"}