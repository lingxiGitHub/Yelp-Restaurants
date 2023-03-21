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

    resImage104 = RestaurantImage(
        restaurant_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/S7fgrf38twxsKIHmrR1FhQ/o.jpg", preview=False
    )

    resImage105 = RestaurantImage(
        restaurant_id=1, url="https://s3-media0.fl.yelpcdn.com/bphoto/ktMQpF8GPqIk5P49Ai47Pg/o.jpg", preview=False
    )

    resImage2 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/LiQr9amgfaAZ15jW_E7hJw/o.jpg", preview=True
    )

    resImage201 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/ndqPdpOBwZvCUxzOtevP_Q/o.jpg", preview=False
    )
    resImage202 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/SX7IUl0G_XMbTLVeTQTTkQ/o.jpg", preview=False
    )

    resImage203 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/AJPCGGfkemhqK_T9coaAjQ/o.jpg", preview=False
    )

    resImage204 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/snFreAy21O2Am28lQoaG4g/o.jpg", preview=False
    )

    resImage205 = RestaurantImage(
        restaurant_id=2, url="https://s3-media0.fl.yelpcdn.com/bphoto/QlqNmjkP-I3Q2y-2kYMIVw/o.jpg", preview=False
    )

    resImage3 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/RYJNW4aubokOkFowtZAFUw/o.jpg", preview=True
    )

    resImage301 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/NoXsXk4V0a3ctd18S8odEw/o.jpg", preview=False
    )
    resImage305 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/i6bC4UuUv9L4d2ugXMPl8A/o.jpg", preview=False
    )
    resImage302 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/hAR4vAv0SRqrKqul55xj7Q/o.jpg", preview=False
    )
    resImage303 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/WbQIA-RMhbfYmWs4iucaOg/o.jpg", preview=False
    )
    resImage304 = RestaurantImage(
        restaurant_id=3, url="https://s3-media0.fl.yelpcdn.com/bphoto/SE1zWOReIRoud9Wan9QqoA/o.jpg", preview=False
    )

    resImage4 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/jNVzNb0v96ized80X-nBbQ/o.jpg", preview=True
    )

    resImage401 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/xEruZ-LWp-Za1DPEPDHwuQ/o.jpg", preview=False
    )

    resImage402 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/PY0flzm2V3H2wa4VDRGuVA/o.jpg", preview=False
    )
    resImage403 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/vpQYIKqdhZl3XXGOPj1qLA/o.jpg", preview=False
    )
    resImage404 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/5-bAw-14xxvI3lDAEp7NFQ/o.jpg", preview=False
    )
    resImage405 = RestaurantImage(
        restaurant_id=4, url="https://s3-media0.fl.yelpcdn.com/bphoto/QdWqmvxYQbWPLcyxJtZ1uw/o.jpg", preview=False
    )

    resImage5 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/um1dEucLzU8lpyFzwXD5Ag/o.jpg", preview=True
    )

    resImage501 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/hzbjKbAGaYiRn9rw8ZyJ6w/o.jpg", preview=False
    )

    resImage502 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/m7T9BoKKLnMRs7hw9Ql7rg/o.jpg", preview=False
    )

    resImage503 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/FAivPAFD6Q9nLWzU5uzHow/o.jpg", preview=False
    )

    resImage504 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/RdSJg63MNHfGfsQrv5RLcQ/o.jpg", preview=False
    )

    resImage505 = RestaurantImage(
        restaurant_id=5, url="https://s3-media0.fl.yelpcdn.com/bphoto/ofAlOgVZ58RzVigfZV1Qng/o.jpg", preview=False
    )

    resImage6 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/9aPP6Dp7IDXh6cjLlp33cg/o.jpg", preview=True
    )

    resImage601 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/U0dSf95FJM4m_RVhTpPcwg/o.jpg", preview=False
    )
    resImage602 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/z-vgYsG4pkPxJ6Z0ERnIIg/o.jpg", preview=False
    )
    resImage603 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/enibFyrIxAOtHo-LwA7pKg/o.jpg", preview=False
    )
    resImage604 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/R5LyG28wqOUe-5m1mFSgHA/o.jpg", preview=False
    )
    resImage605 = RestaurantImage(
        restaurant_id=6, url="https://s3-media0.fl.yelpcdn.com/bphoto/LWG0S_rlkNfuP9Wz1wfu-g/o.jpg", preview=False
    )


    resImage7 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/4dfQtINKJeKIjVF_Cg1gYw/o.jpg", preview=True
    )

    resImage701 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/mTxx47FvrezCOXKnbMPILg/o.jpg", preview=False
    )
    resImage702 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/C1LTqBdo2PPO9-yhzjv0lA/o.jpg", preview=False
    )
    resImage703 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/6AxSIhUOuD_VxgNIKarqJQ/o.jpg", preview=False
    )
    resImage704 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/FTzWgQGxqiO_vp6ghP1EMw/o.jpg", preview=False
    )
    resImage705 = RestaurantImage(
        restaurant_id=7, url="https://s3-media0.fl.yelpcdn.com/bphoto/twxjt8w2w6cMUhZwVk4ZJQ/o.jpg", preview=False
    )

    resImage8 = RestaurantImage(
        restaurant_id=8, url="https://d33wubrfki0l68.cloudfront.net/768900453ae82302cd43755ea896b6901bcc99f5/1347b/assets/images/hoyboys_303.jpg", preview=True
    )

    resImage801 = RestaurantImage(
        restaurant_id=8, url="https://s3-media0.fl.yelpcdn.com/bphoto/gFa5AK6PDrFCfzY9aZEyYw/o.jpg", preview=False
    )

    resImage802 = RestaurantImage(
        restaurant_id=8, url="https://s3-media0.fl.yelpcdn.com/bphoto/Ocfk2IaClnWeQAbuaup8wA/o.jpg", preview=False
    )

    resImage803 = RestaurantImage(
        restaurant_id=8, url="https://s3-media0.fl.yelpcdn.com/bphoto/C477ZDknB_HNsbxisW9dEw/o.jpg", preview=False
    )

    resImage804 = RestaurantImage(
        restaurant_id=8, url="https://s3-media0.fl.yelpcdn.com/bphoto/x7AXGoTab90ntigpkqAR1w/o.jpg", preview=False
    )

    resImage805 = RestaurantImage(
        restaurant_id=8, url="https://s3-media0.fl.yelpcdn.com/bphoto/XYYAXl9FyL7RB7-BxZ2KrA/o.jpg", preview=False
    )

    resImage9 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/gu0Y53VhvHpfag40q_M9Bg/o.jpg", preview=True
    )

    resImage901 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/04BfV1TE5CX1l3qBRoAMEw/o.jpg", preview=False
    )

    resImage901 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/04BfV1TE5CX1l3qBRoAMEw/o.jpg", preview=False
    )
    resImage902 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/gisX80_JX2hDaGZ8g2oGNA/o.jpg", preview=False
    )
    resImage903 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/Y3RULuqtUc3gMBRpsHWnVA/o.jpg", preview=False
    )
    resImage904 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/GErZ-ZcnNYrz50VqNaf-YQ/o.jpg", preview=False
    )
    resImage905 = RestaurantImage(
        restaurant_id=9, url="https://s3-media0.fl.yelpcdn.com/bphoto/bfua4xaK87Dov2CK3XT_ug/o.jpg", preview=False
    )

    resImage10 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/J_vcjB4atwxI46rCEuW43g/o.jpg", preview=True
    )

    resImage1001 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/Tnt0Q5jmUdpzVqIGhS-W9A/o.jpg", preview=False
    )

    resImage1002 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/a9T82O3s2B5edLP6JGB3Zg/o.jpg", preview=False
    )

    resImage1003 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/2kmTAd6bG7M9tXC1CeCucA/o.jpg", preview=False
    )

    resImage1004 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/NrmpGON9wmRiorUaDzAXIA/o.jpg", preview=False
    )

    resImage1005 = RestaurantImage(
        restaurant_id=10, url="https://s3-media0.fl.yelpcdn.com/bphoto/HoddBmmc3lz0sM3Fb_JbSA/o.jpg", preview=False
    )

    

    all_restaurantImages = [resImage1,resImage101, resImage102,resImage103,resImage104,resImage105,
    resImage2, resImage201,resImage202,resImage203,resImage204,resImage205,
    resImage3, resImage301, resImage302,resImage303,resImage304,resImage305,
    resImage4, resImage401, resImage402,resImage403,resImage404,resImage405,
    resImage5,  resImage501, resImage502,resImage503,resImage504,resImage505,
    resImage6,  resImage601, resImage602,resImage603,resImage604,resImage605,
    resImage7, resImage701, resImage702,resImage703,resImage704,resImage705,
    resImage8, resImage801,resImage802,resImage803,resImage804,resImage805,
    resImage9, resImage901,resImage902,resImage903,resImage904,resImage905,
    resImage10, resImage1001,resImage1002,resImage1003,resImage1004,resImage1005
  
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
