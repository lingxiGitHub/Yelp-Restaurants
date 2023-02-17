// import "./DeletePhoto.css"

// import { deletePhotoThunk } from "../../store/restaurantPhoto"
// import { getSingleRestaurant } from "../../store/restaurants"

// export default function DeletePhoto({singleRestaurant, sessionUser, dispatch, restaurantId, history,}){
//     let sessionLinks;



//     const handleDelete = (e) => {
//         e.preventDefault();
//         dispatch(deletePhotoThunk(+restaurantId, photoId))
//             .then(() => dispatch(getSingleRestaurant(restaurantId)))
//             .then(() => history.push(`/restaurants/${restaurantId}`))
//         setShowDeleteEdit(false)
//     }

//     if (sessionUser) {

//         const currentUserId = sessionUser.id
//         const restaurantOwnerId = singleRestaurant.user_id

//         if (currentUserId === restaurantOwnerId) {
//             sessionLinks = (

//                 <div>
//                     <button
//                         onClick={handleDelete}
//                     >Confirm Delete</button>
//                 </div>
//             )


//         } else if (currentUserId !== restaurantOwnerId) {
//             sessionLinks = (
//                 <p>You did not upload this photo</p>
//             )
//         }

//     }
//     return (
//         <>

//             {sessionUser && (
//                 sessionLinks

//             )}

//             {!sessionUser && (
//                 <div>Please log in to delete photo</div>
//             )}
//         </>
//     )

// }