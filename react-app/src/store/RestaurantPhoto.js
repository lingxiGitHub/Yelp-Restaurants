// import { useHistory } from "react-router-dom";
import { csrfFetch } from "./csrf"
import { getSingleRestaurant } from "./restaurants";

//add photo
const ADD_PHOTO = "photos/addPhoto"
export const createPhoto = (createdPhoto) => ({
    type: ADD_PHOTO,
    id: createdPhoto.id,
    createdPhoto

})
export const addPhoto = (newPhoto, restaurantId) => async dispatch => {

    const response = await csrfFetch(`/api/restaurants/${restaurantId}/images`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPhoto)
    });
    if (response.ok) {
        const createdPhoto = await response.json()
        dispatch(createPhoto(createdPhoto))
        dispatch(getSingleRestaurant(restaurantId))

    }
}

//delete a photo
const DELETE_PHOTO = "photos/deletePhoto"
export const deletePhoto = (photoId) => ({
    type: DELETE_PHOTO,
    photoId
})



export const deletePhotoThunk = (photoId, restaurantId) => async dispatch => {

    const res = await csrfFetch(`/api/restaurant-images/${photoId}`, {
            method: "DELETE"
        })
        if (res.ok) {
            dispatch(deletePhoto(photoId))
            dispatch(getSingleRestaurant(restaurantId))
        }


}



const initialState = {}

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {

        // case DELETE_REVIEW:
        //     const deleteReviewState = { ...state }
        //     // console.log("look if undefined", deleteReviewState)
        //     delete deleteReviewState.spot[action.id]
        //     return deleteReviewState;
        case ADD_PHOTO:
            const newPhotoState = { ...state }
            newPhotoState.restaurant[action.id] = action.createdPhoto
            return newPhotoState

        default:
            return state
    }

}
