from app.models import db, Restaurant, environment, SCHEMA

def seed_restaurants():
  res1 = Restaurant(
    user_id=1, name="Lua Viet Kitchen", price="$$", address = "1540 W Alabama St Ste 300", city = "Houston",
    state ="TX", zipcode= 77006, country="USA", phone_number = "(346) 227-7047", description = "delicious", website="http://www.luavietkitchen.com"
  )

  res2 = Restaurant(
    user_id=2, name="Squable", price="$$", address = "632 W 19th St", city = "Houston",
    state ="TX", zipcode= 77008, country="USA", phone_number = "(832) 834-7362", description = "delicious", website="http://squabletime.com"
  )
  res3 = Restaurant(
    user_id=3, name="Killen's Barbecue", price="$$", address = "3613 E Broadway", city = "Pearland",
    state ="TX", zipcode= 77581, country="USA", phone_number = "(281) 485-2272", description = "delicious", website= "http://www.killensbarbecue.com"
  )
  res4 = Restaurant(
    user_id=4, name="North Italia", price="$$", address = "1700 Post Oak Blvd Ste 190", city = "Houston",
    state ="TX", zipcode= 77056, country="USA", phone_number = "(281) 605-4030", description = "delicious", website = "https://www.northitalia.com"
  )

  res5 = Restaurant(
    user_id=5, name="Uchi", price="$$$$", address = "904 Westheimer Rd Ste A", city = "Houston",
    state ="TX", zipcode= 77006, country="USA", phone_number = "(713) 522-4808", description = "delicious", website = "https://uchihouston.com"
  )

  res6 = Restaurant(
    user_id=6, name="Pecan Lodge", price="$$", address = "2702 Main St", city = "Dallas",
    state ="TX", zipcode= 77226, country="USA", phone_number = "(214) 748-8900", description = "delicious", website = "http://www.pecanlodge.com/"
  )

  res7 = Restaurant(
    user_id=7, name="Hard Eight BBQ", price="$$", address = "688 Freeport Pkwy", city = "Coppell",
    state ="TX", zipcode= 75019, country="USA", phone_number = "(972) 471-5462", description = "delicious", website = "https://hardeightbbq.com"
  )

  res8 = Restaurant(
    user_id=8, name="World Famous HotBoys", price="$$", address = "1601 San Pablo", city = "Oakland",
    state ="California", zipcode= 94612, country="USA", phone_number = "(510)123-4567", description = "Oakland Halal Hot Chicken made with love", website = "http://worldfamoushotboys.com"
  )

  res9 = Restaurant(
    user_id=9, name="Denica's Real Food Kitchen", price="$$", address = "2723 Castro Valley Blvd", city = "Castro Valley",
    state ="California", zipcode= 94546, country="USA", phone_number = "(510)537-1100", description = "Established in 1999. The cookie man and the cake lady fell in love, and together with their 5 kids threw it all together into this new creation", website = "https://denicascafe.com"
  )

  res10 = Restaurant(
    user_id=10, name="Naked Fish", price="$$", address = "24703 Jackson Street", city = "Hayward",
    state ="California", zipcode= 94544, country="USA", phone_number = "(510)887-4569", description = "Delicious and authentic sushi and Japanese cuisine!", website = "https://naked-fish.cafes-world.com"
  )

  res11 = Restaurant(
    user_id=11, name="Tin Fu", price="$", address = "448 W Harder Road", city = "Hayward",
    state ="California", zipcode= 94544, country="USA", phone_number = "(510)887-2398", description = "Delicious authentic Chinese cuisine!", website = "https://www.tinfuchineserestaurant.com/"
  )

  all_restaurants = [res1, res2, res3, res4, res5, res6, res7, res8 ,res9, res10, res11]
  add_restaurants = [db.session.add(res) for res in all_restaurants]
  db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM restaurants")

    db.session.commit()
