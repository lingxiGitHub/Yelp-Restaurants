# from app.models import db, User, environment, SCHEMA


# # Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         username='Demo', email_address='demo@aa.io', password='password', first_name="Demo", last_name="User")
#     marnie = User(
#         username='marnie', email_address='marnie@aa.io', password='password', first_name="Marnie", last_name="Stevens")
#     bobbie = User(
#         username='bobbie', email_address='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Jackson")
#     tommy = User(
#         username='Tommy-Bahama', email_address='Tommy_Bahama@hotmail.com', password='password', first_name="Tommy", last_name="Bahama")
#     eleanor = User(
#         username='Eleanor-Auker', email_address='Eleanor_Auker@hotmail.com', password='password', first_name="Eleanor", last_name="Auker")
#     james = User(
#         username='James-Bacher', email_address='James_Bacher@hotmail.com', password='password', first_name="James", last_name="Bacher")
#     hazel = User(
#         username='Hazel-Zane', email_address='Hazel_Zane@hotmail.com', password='password', first_name="Hazel", last_name="Zane")
#     ellis = User(
#         username='Ellis-Wink', email_address='Ellis_Wink@hotmail.com', password='password', first_name="Ellis", last_name="Wink")
#     audrey = User(
#         username='Audrey-Wherry', email_address='Audrey_Wherry@hotmail.com', password='password', first_name="Audrey", last_name="Wherry")
#     olive = User(
#         username='Olive-Tomson', email_address='Olive_Tomson@hotmail.com', password='password', first_name="Olive", last_name="Tomson")
#     william = User(
#         username='William-Tandy', email_address='William_Tandy@hotmail.com', password='password', first_name="William", last_name="Tandy")
#     charlie = User(
#         username='Charlie-Staple', email_address='Charlie_Staple@hotmail.com', password='password', first_name="Charlie", last_name="Staple")
#     ivy = User(
#         username='Ivy-Rosemond', email_address='Ivy_Rosemond@hotmail.com', password='password', first_name="Ivy", last_name="Rosemond")
#     ella = User(
#         username='Ella-Tolly', email_address='Ella_Tolly@hotmail.com', password='password', first_name="Ella", last_name="Tolly")
#     adrian = User(
#         username='Adrian', email_address='Adrian@gmail.com', password='adrianiscool', first_name='Adrian', last_name='Tran')

#     userList = [demo, marnie, bobbie, tommy, eleanor, james, hazel,
#                 ellis, audrey, olive, william, charlie, ivy, ella, adrian]

#     add_users = [db.session.add(user) for user in userList]

#     # db.session.add(demo)
#     # db.session.add(marnie)
#     # db.session.add(bobbie)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_users():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM users")

#     db.session.commit()

from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email_address='demo@aa.io', password='password', first_name="Demo", last_name="User")
    marnie = User(
        username='marnie', email_address='marnie@aa.io', password='password', first_name="Marnie", last_name="Stevens")
    bobbie = User(
        username='bobbie', email_address='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Jackson")
    tommy = User(
        username='Tommy-Bahama', email_address='Tommy_Bahama@hotmail.com', password='password', first_name="Tommy", last_name="Bahama")
    eleanor = User(
        username='Eleanor-Auker', email_address='Eleanor_Auker@hotmail.com', password='password', first_name="Eleanor", last_name="Auker")
    james = User(
        username='James-Bacher', email_address='James_Bacher@hotmail.com', password='password', first_name="James", last_name="Bacher")
    hazel = User(
        username='Hazel-Zane', email_address='Hazel_Zane@hotmail.com', password='password', first_name="Hazel", last_name="Zane")
    ellis = User(
        username='Ellis-Wink', email_address='Ellis_Wink@hotmail.com', password='password', first_name="Ellis", last_name="Wink")
    audrey = User(
        username='Audrey-Wherry', email_address='Audrey_Wherry@hotmail.com', password='password', first_name="Audrey", last_name="Wherry")
    olive = User(
        username='Olive-Tomson', email_address='Olive_Tomson@hotmail.com', password='password', first_name="Olive", last_name="Tomson")
    william = User(
        username='William-Tandy', email_address='William_Tandy@hotmail.com', password='password', first_name="William", last_name="Tandy")
    charlie = User(
        username='Charlie-Staple', email_address='Charlie_Staple@hotmail.com', password='password', first_name="Charlie", last_name="Staple")
    ivy = User(
        username='Ivy-Rosemond', email_address='Ivy_Rosemond@hotmail.com', password='password', first_name="Ivy", last_name="Rosemond")
    ella = User(
        username='Ella-Tolly', email_address='Ella_Tolly@hotmail.com', password='password', first_name="Ella", last_name="Tolly")
    adrian = User(
        username='Adrian', email_address='Adrian@gmail.com', password='adrianiscool', first_name='Adrian', last_name='Tran')

    userList = [demo, marnie, bobbie, tommy, eleanor, james, hazel,
                ellis, audrey, olive, william, charlie, ivy, ella, adrian]

    add_users = [db.session.add(user) for user in userList]

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
