from flask_wtf import FlaskForm

from wtforms import IntegerField, StringField,BooleanField
from wtforms.validators import DataRequired

class RestaurantImageForm(FlaskForm):

  url = StringField("url",validators=[DataRequired()])
  preview = BooleanField("preview")

  
