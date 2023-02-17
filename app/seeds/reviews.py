from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    review1 = Review(
        user_id=1, restaurant_id=2, review="Holy cow! If you're ever in the Bay Area, you have to give this place a go. Being from Seattle, our seafood is fresh..", rating=4
    )

    review2 = Review(
        user_id=2, restaurant_id=3, review="Went here on a recommendation from a family member", rating=4
    )

    review3 = Review(
        user_id=2, restaurant_id=4, review="Our go to spot we make sure to visit almost every week. The service is top notch", rating=4
    )

    review4 = Review(
        user_id=3, restaurant_id=4, review="I like this place", rating=5
    )

    review5 = Review(
        user_id=3, restaurant_id=5, review="Good food. Nice view, service has always been on point. Absolutely love their tortilla soup!!!", rating=4
    )

    review6 = Review(
        user_id=4, restaurant_id=5, review="The experience was good", rating=4
    )

    review7 = Review(
        user_id=4, restaurant_id=6, review="Bloom has been on my list of brunch places to try for the longest time...", rating=4
    )

    review8 = Review(
        user_id=5, restaurant_id=6, review="The wait is too long but food is good", rating=4
    )

    review9 = Review(
        user_id=5, restaurant_id=7, review="Great food, service, and atmosphere. I like the fact that it's indoor/outdoor dining.", rating=4
    )

    review10 = Review(
        user_id=6, restaurant_id=7, review="Way over-priced.", rating=3
    )

    review11 = Review(
        user_id=6, restaurant_id=8, review="I came by with a friend on a busy Friday for dinner but we were seated quickly", rating=4
    )

    review12 = Review(
        user_id=6, restaurant_id=9, review="I found this place from yelp and I like it so far", rating=4
    )

    review13 = Review(
        user_id=7, restaurant_id=8, review="Had a great time at this location, Alexis was a great waitress and definitely will be coming back!", rating=4
    )

    review14 = Review(
        user_id=8, restaurant_id=9, review="They cancel my appointment without letting me know", rating=2
    )

    review15 = Review(
        user_id=8, restaurant_id=10, review="Such a nice place inside~ I appreciated their attention to detail.", rating=4
    )

    review16 = Review(
        user_id=9, restaurant_id=10, review="good food", rating=5
    )

    review17 = Review(
        user_id=9, restaurant_id=11, review="OMG! Delicious! Had the Salmon healthy plate and my friend had the chicken healthy plate. Both were delicious", rating=5
    )

    review18 = Review(
        user_id=10, restaurant_id=11, review="average.", rating=2
    )

    review19 = Review(
        user_id=10, restaurant_id=1, review="My coworkers and I want to try new restaurants together on a regular basis.", rating=4
    )

    review20 = Review(
        user_id=11, restaurant_id=1, review="I recommend this place to all my coworkers", rating=4
    )

    review21 = Review(
        user_id=11, restaurant_id=2, review="My husband and I celebrated our third anniversary here.", rating=4
    )

    review22 = Review(
        user_id=12, restaurant_id=3, review="highly recommended", rating=4
    )

    review23 = Review(
        user_id=12, restaurant_id=4, review="simply DELICIOUS! Will return and recommend to anyone seeking the perfect sando!", rating=4
    )

    review24 = Review(
        user_id=13, restaurant_id=5, review="love this place!", rating=5
    )

    review25 = Review(
        user_id=13, restaurant_id=6, review="I don't like waiting in lines, but the wait for Ramen Nagi was worth it.", rating=4
    )

    review26 = Review(
        user_id=14, restaurant_id=5, review="Never want to come back again", rating=3
    )

    review27 = Review(
        user_id=14, restaurant_id=4, review="Excellent service and food is well prepared.", rating=4
    )

    review28 = Review(
        user_id=15, restaurant_id=3, review="Come here to celebrate my birthday and have good memories", rating=5
    )

    review29 = Review(
        user_id=15, restaurant_id=1, review="Pretty average, nice quick bite place!", rating=4
    )

    review30 = Review(
        user_id=1, restaurant_id=10, review="Do not recommend", rating=3
    )

    review31 = Review(
        user_id=8, restaurant_id=2, review="Colorful restaurant with homey, delicious food, and warm service.", rating=5
    )

    review32 = Review(
        user_id=9, restaurant_id=3, review="Amazing food, amazing portions, amazing prices", rating=5
    )

    review33 = Review(
        user_id=11, restaurant_id=10, review="If you have not been here. I highly recommend it.", rating=5
    )

    review34 = Review(
        user_id=12, restaurant_id=10, review="Looking forward to returning, especially can't wait to try their desserts next time!", rating=5
    )

    review35 = Review(
        user_id=7, restaurant_id=11, review="The service was amazing", rating=5
    )

    review36 = Review(
        user_id=13, restaurant_id=11, review="Some of the best chilaquiles I've had! So much to choose from and so many various options of chilaquiles and more.", rating=5
    )



    all_reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20, review21, review22, review23, review24, review25, review26, review27, review28, review29, review30, review31, review32, review33, review34, review35, review36]

    add_reviews = [db.session.add(reviews) for reviews in all_reviews]

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
