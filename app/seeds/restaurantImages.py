from app.models import db, RestaurantImage, environment, SCHEMA

def seed_restaurantImages():
    resImage1 = RestaurantImage(
        restaurant_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/rjDIjk_es-25_k93_9IGcA/o.jpg", preview=True
    )
    resImage101 = RestaurantImage(
        restaurant_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/Jh3tsyOhaERSsBM8a_Mhdw/o.jpg", preview=False
    )

    resImage102 = RestaurantImage(
        restaurant_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/lUaw3oxiS6nu3pbhDL-q-Q/o.jpg", preview=False
    )

    resImage103 = RestaurantImage(
        restaurant_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/M-_bdyXbfgUzotZr5mty9Q/o.jpg", preview=False
    )

    resImage2 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/LiQr9amgfaAZ15jW_E7hJw/o.jpg", preview=True
    )

    resImage201 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/ndqPdpOBwZvCUxzOtevP_Q/o.jpg", preview=False
    )

    resImage3 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/RYJNW4aubokOkFowtZAFUw/o.jpg", preview=True
    )

    resImage301 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/NoXsXk4V0a3ctd18S8odEw/o.jpg", preview=False
    )


    resImage4 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/jNVzNb0v96ized80X-nBbQ/o.jpg", preview=True
    )

    resImage401 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/xEruZ-LWp-Za1DPEPDHwuQ/o.jpg", preview=False
    )

    resImage5 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/um1dEucLzU8lpyFzwXD5Ag/o.jpg", preview=True
    )

    resImage501 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/hzbjKbAGaYiRn9rw8ZyJ6w/o.jpg", preview=False
    )

    resImage6 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/9aPP6Dp7IDXh6cjLlp33cg/o.jpg", preview=True
    )

    resImage601 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/U0dSf95FJM4m_RVhTpPcwg/o.jpg", preview=False
    )


    resImage7 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/4dfQtINKJeKIjVF_Cg1gYw/o.jpg", preview=True
    )

    resImage701 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/mTxx47FvrezCOXKnbMPILg/o.jpg", preview=False
    )


    resImage8 = RestaurantImage(
        restaurant_id=8, url="https://d33wubrfki0l68.cloudfront.net/768900453ae82302cd43755ea896b6901bcc99f5/1347b/assets/images/hoyboys_303.jpg", preview=True
    )

    resImage801 = RestaurantImage(
        restaurant_id=8, url="https://s3-media0.fl.yelpcdn.com/bphoto/gFa5AK6PDrFCfzY9aZEyYw/o.jpg", preview=False
    )

    resImage9 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/gu0Y53VhvHpfag40q_M9Bg/o.jpg", preview=True
    )

    resImage901 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/04BfV1TE5CX1l3qBRoAMEw/o.jpg", preview=False
    )

    resImage10 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/J_vcjB4atwxI46rCEuW43g/o.jpg", preview=True
    )

    resImage1001 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/Tnt0Q5jmUdpzVqIGhS-W9A/o.jpg", preview=False
    )

    resImage11 = RestaurantImage(
        restaurant_id=11, url="https://s3-media0.fl.yelpcdn.com/bphoto/sZiF-4YgfuHBC9kYaafMwQ/o.jpg", preview=True
    )

    resImage1101 = RestaurantImage(
        restaurant_id=11, url="https://s3-media0.fl.yelpcdn.com/bphoto/cSCgED6Sy8H8BUaw5CJQOw/o.jpg", preview=False
    )

    all_restaurantImages = [resImage1,resImage101, resImage102,resImage103,
    resImage2, resImage201,
    resImage3, resImage301, 
    resImage4, resImage401, 
    resImage5,  resImage501, 
    resImage6,  resImage601, 
    resImage7, resImage701, 
    resImage8, resImage801,
    resImage9, resImage901,
    resImage10, resImage1001,
    resImage11,resImage1101,
    ]

    add_restaurantImages = [db.session.add(resImage) for resImage in all_restaurantImages]
    db.session.commit()


def undo_restaurantImages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurant_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM restaurant_images")

    db.session.commit()
