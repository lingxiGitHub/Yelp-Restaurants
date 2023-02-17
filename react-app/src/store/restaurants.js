// import { csrfFetch } from './csrf';
// import { useHistory } from "react-router-dom";
// import allRestaurants from "../data/all-restaurants.json"
// import singleRestaurant from '../data/single-restaurant.json';
import { csrfFetch } from "./csrf"

// ------------------------ search restaurants thunk ------------------------------------

export const SEARCH_RESTAURANTS = "restaurants/searchedRestaurants";

// regular action creators
const search = (restaurants) => ({
    type: SEARCH_RESTAURANTS,
    restaurants
});


// Create the action creator for searching all restaurants
// thunk action creator
export const search_restaurants = (keyword) => async (dispatch) =>{
    const response = await fetch(`/api/restaurants/search/${keyword}`)

    if (response.ok){
     // Constant variable to specify the action type (“restaurants/searchedRestaurants”)
      const data = await response.json()
      console.log('data from backend', data)
      dispatch(search(data))
      return data
    }
  }

// ------------------------ search restaurants thunk ------------------------------------


//homepage load all restaurants
const LOAD = "restaurants/loadRestaurants"
export const loadRestaurants = (list) => ({
    type: LOAD,
    allRestaurants: list
})

export const getAllRestaurants = () => async dispatch => {
    const response = await fetch(`/api/restaurants`)
    if (response.ok) {
        const listObj = await response.json()
        const list = listObj.Restaurants
        // console.log("back end fetched list", listObj)
        dispatch(loadRestaurants(list))
    }
}
// single page load all info
const LOADSINGLE = "singleRestaurant/loadSingleRestaurant"
export const loadSingleRestaurant = (detailObj) => ({
    type: LOADSINGLE,
    singleRestaurant: detailObj
})

export const getSingleRestaurant = (restaurantId) => async dispatch => {
    // console.log("!!!!restaurantId at getSinglerestaurant", restaurantId)
    const response = await fetch(`/api/restaurants/${restaurantId}`)
    // console.log("--->response from single restaurant", response)
    if (response.ok) {

        const detailObj = await response.json()
        // console.log("----->>>>detailObj", detailObj)
        dispatch(loadSingleRestaurant(detailObj))
    } else {
        console.log("fetch single restaurant failed")
    }
}

//create restaurant
const ADD_RESTAURANT ="restaurants/addRestaurants"

export const createRestaurant=(newRestaurant)=>({
    type: ADD_RESTAURANT,
    newRestaurant
})

export const addRestaurantThunk = (newRestaurant) => async dispatch => {
    let createdRestaurantId;
    console.log("I am in addRestaurantThunk")
    const response = await csrfFetch("/api/restaurants/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurant)
    });
    if (response.ok) {
        const createdRestaurant = await response.json()
        console.log("createdRestaurant", createdRestaurant)
        createdRestaurantId = createdRestaurant.id
        console.log("createdRestaurantId", createdRestaurantId)
    }else{
        console.log("add restaurant failed here")
    }

    if (createdRestaurantId) {

        const previewImage={
            url:newRestaurant.url,
            preview:true
        }

        const responseObj = await fetch(`/api/restaurants/${createdRestaurantId}/images`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(previewImage)
        })

        // if (responseObj.ok){
        //     console.log("we created a res image for newly created restaurant!!!")
        // }
        if (responseObj.ok) {
            // const createdRestaurantUrl = await responseObj.json()

            return createdRestaurantId
        }
    }

}

//edit restaurant
const UPDATE_RESTAURANT = "restaurants/updateRestaurant"
export const updateSingleRestaurant = (restaurant) => ({
    type: UPDATE_RESTAURANT,
    restaurant
})

export const updateRestaurantThunk = (restaurant, user_id) => async dispatch => {
    const { id,user_id, name, price,address,city,state,zipcode,country,phone_number,description,website } = restaurant
    const res = await fetch(`/api/restaurants/${+id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id, name, price, address, city, state, zipcode, country, phone_number, description, website
        })
    })

    if (res.ok) {
        const updatedRestaurant = await res.json()
        dispatch(updateSingleRestaurant(updatedRestaurant))
        dispatch(getSingleRestaurant(updatedRestaurant.id))
        return updatedRestaurant
    }
}


//delete a restaurant
const DELETE_RESTAURANT = "restaurants/deleteRestaurant"
export const deleteRestaurant = (id) => ({
    type: DELETE_RESTAURANT,
    id
})

export const deleteRestaurantThunk = (id) => async dispatch => {

    const res = await csrfFetch(`/api/restaurants/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteRestaurant(id))
        dispatch(getAllRestaurants())
    }


}



//reducer
const initialState = {};

export default function restaurantsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            const newAllRestaurants = {}
            action.allRestaurants.forEach(restaurant => {
                newAllRestaurants[restaurant.id] = restaurant
            })

            return {
                ...state,
                allRestaurants: {
                    ...newAllRestaurants
                }
            };

        case LOADSINGLE: {

            const newSingleState = action.singleRestaurant
            // console.log("newSingleState", newSingleState)

            return {
                ...state,
                singleRestaurant: {
                    ...state.singleRestaurant,
                    ...newSingleState
                }
            }
        }

        //  case ADD_RESTAURANT: {
        //     const newSpotState = { ...state }
        //     newSpotState[action.spot.id] = action.spot

        //     return newSpotState

        // }

        case UPDATE_RESTAURANT: {
            const updateRestaurantState = { ...state }
            updateRestaurantState.singleRestaurant[action.restaurant.id] = action.restaurant
            // console.log("look")
            // console.log("updateSpotState",updateSpotState)
            return updateRestaurantState
        }

        case DELETE_RESTAURANT: {
            const deleteRestaurantState = { ...state }
            delete deleteRestaurantState.singleRestaurant[action.id]
            return deleteRestaurantState
        }

        case SEARCH_RESTAURANTS:
            console.log('state from reducer', state)
            console.log('123456', action.restaurants.keyword)
            const newState = { ...state, searchedRestaurants: {} };
            action.restaurants.Restaurants.forEach((restaurant) => {
                newState.searchedRestaurants[restaurant.id] = restaurant;
            });
            console.log('MEOW@@#',newState)
            return newState;



        default:
            return state;

    }
}
