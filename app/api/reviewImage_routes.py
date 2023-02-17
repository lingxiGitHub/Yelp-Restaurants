from flask import Blueprint
from app.models import db, ReviewImage

reviewImage_routes = Blueprint('reviewImages', __name__)

@reviewImage_routes.route('/<int:id>', methods=['DELETE'])
def delete_reviewImage_by_imageId(id):
  reviewImage = ReviewImage.query.get(id)
  if not reviewImage:
    return {"errors":["Review Image couldn't be found"]}, 404

  db.session.delete(reviewImage)
  db.session.commit()
  return {"message": ["Successfully deleted"]}, 200
