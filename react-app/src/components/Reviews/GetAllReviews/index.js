import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchAllReviewsByRestaurantId ,deleteReviewById} from "../../../store/reviewsReducer";
// import UpdateReview from "../UpdateReview";
import './getAllReviews.css'

export default function GetAllReviews({restaurantId}){
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => {
    return state.session.user
  })
  const currentRestaurant = useSelector(state => state.Restaurants.singleRestaurant)

  const allReviews = useSelector(state => {
    return state.reviews
  })

  useEffect(() => {
    dispatch(fetchAllReviewsByRestaurantId(restaurantId))
  },[dispatch])
  const reviews = Object.values(allReviews);
  let userReview = null;
  let isOwnedBySessionUser = false;
  if(sessionUser){
    userReview = reviews.filter(review => review.user.id === sessionUser.id)
    isOwnedBySessionUser = sessionUser.id === currentRestaurant.User.id
  }

  const handleDelete = (reviewId, restaurantId) => async (e) => {
    // console.log("handle delete ")
    await dispatch(deleteReviewById(reviewId))
    .then(() => dispatch(fetchAllReviewsByRestaurantId(restaurantId)))
    history.push(`/${restaurantId}`)
  }

  const handleUpdate = (review, reviewId) => async (e) => {
    history.push(`/${restaurantId}/reviews/${reviewId}/update`)
  }

  const options = { year: 'numeric', month: 'long' };
  return (
    <div className="reviews-container">
    <h2>Reviews</h2>

    {reviews.map(review => (
      <div className="single-review-container" key={review.id}>
        <div className="single-review">
        <div className="review-user-data">
          <div >
            <img src="https://a0.muscache.com/defaults/user_pic-225x225.png" alt=""/>
          </div>
          <div>
            <div>user: {review.user.firstname}</div>
            <div>Time: {new Date(review.updatedAt).toLocaleDateString("en-US", options)}</div>
          </div>

        </div>
        <div>Review: {review.review}</div>
      </div>
        <div className="delete-update">
          {sessionUser && review.user.id === sessionUser.id ? <button className="delete-review" onClick={handleDelete(review.id, restaurantId)}>Delete Review</button> : ""}
          {sessionUser && review.user.id === sessionUser.id ? <button className="update-review" onClick={handleUpdate(review, review.id)}>Update Review</button> : ""}
        </div>
      </div>


    ))}
    {sessionUser && !isOwnedBySessionUser && !userReview.length && <NavLink to={`/${restaurantId}/create-review`}>Create New Review</NavLink>}
    </div>
  )
}
