from app.models import db, ReviewImage, environment, SCHEMA


def seed_reviewImages():
    revImage1 = ReviewImage(
        review_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/7sTvhl_SEdLzHrshxP_HOw/o.jpg"
    )

    revImage2 = ReviewImage(
        review_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/Rf1fk-1_AUZakgojqqdPWg/o.jpg"
    )

    revImage3 = ReviewImage(
        review_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/sohfBYnzWYlvmuqVsCaxJA/o.jpg"
    )

    revImage4 = ReviewImage(
        review_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/hzbjKbAGaYiRn9rw8ZyJ6w/o.jpg"
    )

    revImage5 = ReviewImage(
        review_id=9, url="https://www.femalefoodie.com/wp-content/uploads/2016/10/pecan-lodge-4.jpg"
    )

    revImage6 = ReviewImage(
        review_id=11, url="https://s3-media0.fl.yelpcdn.com/bphoto/OkWD0-MwgaTT5gyXNtqvQg/o.jpg"
    )

    revImage7 = ReviewImage(
        review_id=13, url="https://s3-media0.fl.yelpcdn.com/bphoto/foghKZQNb4NDvZ_sUpPmxw/o.jpg"
    )

    revImage8 = ReviewImage(
        review_id=15, url="https://s3-media0.fl.yelpcdn.com/bphoto/I5fs-KC6yZTvSGIFC5JF2g/o.jpg"
    )

    revImage9 = ReviewImage(
        review_id=17, url="https://s3-media0.fl.yelpcdn.com/bphoto/fgwXFsAhW3NjmlnJuw8S9A/o.jpg"
    )

    revImage10 = ReviewImage(
        review_id=19, url="https://s3-media0.fl.yelpcdn.com/bphoto/GjbD0Zn0U64ED85DE7ePcw/o.jpg"
    )

    # db.session.add(revImage1)
    # db.session.add(revImage2)
    # db.session.add(revImage3)
    # db.session.commit()


    all_reviewImages = [revImage1, revImage2, revImage3, revImage4, revImage5, revImage6, revImage7, revImage8, revImage9, revImage10]

    add_reviewImages = [db.session.add(revImage) for revImage in all_reviewImages]
    db.session.commit()


def undo_reviewImages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM review_images")

    db.session.commit()
