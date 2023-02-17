from flask_wtf import FlaskForm

from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ReviewImageForm(FlaskForm):
  url = StringField("url", validators=[DataRequired()])
