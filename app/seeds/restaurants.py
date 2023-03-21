from app.models import db, Restaurant, environment, SCHEMA

def seed_restaurants():
  res1 = Restaurant(
    user_id=1, name="Lua Viet Kitchen", price="$$", address = "1540 W Alabama St Ste 300", city = "Houston",
    state ="TX", zipcode= 77006, country="USA", phone_number = "(346) 227-7047", description = "At LVK, we strive to bring elevated Vietnamese cuisine to Houstonians. We believe food should be made fresh using high quality ingredients. We're proud of the many local partnerships with similar vision and purpose. Sure it takes more time to source responsibly. It takes more effort to prepare food without MSG. But our valued guests deserve more than the standard fare. So come dine with us and xin mi (please enjoy)!", website="http://www.luavietkitchen.com"
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
    state ="TX", zipcode= 77056, country="USA", phone_number = "(281) 605-4030", description = "At North Italia, we're passionate about more than just our crave-worthy Italian food menu. We put our all into every detail, creating an environment that lets you know you're in for something special.", website = "https://www.northitalia.com"
  )

  res5 = Restaurant(
    user_id=5, name="Uchi", price="$$$$", address = "904 Westheimer Rd Ste A", city = "Houston",
    state ="TX", zipcode= 77006, country="USA", phone_number = "(713) 522-4808", description = "Uchi, house in Japanese, is founded by James Beard Award-winning Chef Tyson Cole. A delicate balance of elevated food and impeccable service, Uchi offers non-traditional Japanese cuisine with signature tastings, sushi, and seasonal omakase.", website = "https://uchihouston.com"
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
    state ="California", zipcode= 94546, country="USA", phone_number = "(510)537-1100", description = "Established in 1999. The cookie man and the cake lady fell in love, and together with their 5 kids threw it all together into this new creation, Denica's, in which evolved into what it is today, a bakery/ cafe/ breakfast joint with a lot of Aloha. ", website = "https://denicascafe.com"
  )

  res10 = Restaurant(
    user_id=10, name="Naked Fish", price="$$", address = "24703 Jackson Street", city = "Hayward",
    state ="California", zipcode= 94544, country="USA", phone_number = "(510)887-4569", description = "Sushi Bar . Robata . Wine/Sake Lounge , New Management and Additions to the Menu", website = "https://naked-fish.cafes-world.com"
  )



  all_restaurants = [res1, res2, res3, res4, res5, res6, res7, res8 ,res9, res10]
  add_restaurants = [db.session.add(res) for res in all_restaurants]
  db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM restaurants")

    db.session.commit()
