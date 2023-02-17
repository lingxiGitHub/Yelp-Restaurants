# from flask_wtf import FlaskForm
# from wtforms import StringField
# from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import User, db


# def user_exists(form, field):
#     # Checking if user exists
#     email_address = field.data
#     user = User.query.filter(User.email_address == email_address).first()
#     if not user:
#         raise ValidationError('Email provided not found.')


# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email_address = form.data['email_address']
#     user = User.query.filter(User.email_address == email_address).first()
#     if not user:
#         raise ValidationError('No such user exists.')
#     if not user.check_password(password):
#         # print(password)
#         raise ValidationError('Password was incorrect.')


# class LoginForm(FlaskForm):
#     email_address = StringField('email_address', validators=[DataRequired(), user_exists])
#     password = StringField('password', validators=[DataRequired(), password_matches])

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, db


def user_exists(form, field):
    # Checking if user exists
    email_address = field.data
    user = User.query.filter(User.email_address == email_address).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email_address = form.data['email_address']
    user = User.query.filter(User.email_address == email_address).first()
    print("in validator", user)
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        print("in validator", password)
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email_address = StringField('email_address', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
