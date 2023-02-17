import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import "./RestaurantList.css"
// import allRestaurants from "../../data/all-restaurants.json"
import Restaurant from "../Restaurant"
import { getAllRestaurants } from "../../store/restaurants";
import OpenModalButton from "../OpenModalButton";
import AddRestaurantModal from "../AddRestaurantModal";



function RestaurantList() {
    const sessionUser = useSelector(state => state.session.user);

    const allRestaurantObj = useSelector((state) => {
        // console.log("allRestauranttate", state)
        return state.Restaurants.allRestaurants
    })

    const allRestaurants = allRestaurantObj ? Object.values(allRestaurantObj) : [];
    // console.log("allRestaurants",allRestaurants)

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRestaurants()).then(() => setIsLoaded(true));
    }, [dispatch])

    return (
        isLoaded && (
            <>
                {sessionUser && (

                    <OpenModalButton
                        buttonText="Add Restaurant"
                        modalComponent={<AddRestaurantModal />}
                    />
                )}

                <div className="restaurant-list">
                    {
                        allRestaurants.map(restaurant => {
                            return (
                                <Link className="restaurant-list" key={restaurant.id} to={`/${restaurant.id}`}>
                                    <Restaurant restaurant={restaurant} />
                                </Link>
                            )
                        })
                    }
                </div>
            </>
        )
    )
}


export default RestaurantList