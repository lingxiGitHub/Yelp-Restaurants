import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {updateOneReview, fetchAllReviewsByRestaurantId} from '../../../store/reviewsReducer';
import {getSingleRestaurant} from '../../../store/restaurants'
import './updateReview.css'
export default function UpdateReview(){
  let { reviewId, restaurantId} = useParams();
  // console.log("useParams()", useParams())
  // restaurantId = parseInt(restaurantId)
  // console.log("reviewId:", reviewId)
  const oldReview = useSelector(state => {
    // console.log("****8 state", state)
    return state.reviews[reviewId]
  })
  // console.log("oldReview:", oldReview)

  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState(oldReview["review"]);
  const [rating, setRating] = useState(oldReview["rating"]);
  const [errors, setErrors] = useState([]);

  useEffect( () => {
    dispatch(getSingleRestaurant(restaurantId));
  }, [dispatch. restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newReview = {
      review,
      rating
    };
    const updatedReview = await dispatch(updateOneReview(newReview,reviewId))
      .then(() => dispatch(fetchAllReviewsByRestaurantId(restaurantId)))
      .then(() => dispatch(getSingleRestaurant(restaurantId)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      history.push(`/${oldReview.restaurant_id}`)
  }


    return (
      <div  className="update-review-container">
        <h2>Update Review</h2>
        <form onSubmit={handleSubmit} className="update-new-review-form">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            <span>review:</span>
            <input
              type="text"
              value={review}
              onChange={e => setReview(e.target.value)}
              required
            />
          </label>
          <label>
          <span>rating:</span>
            <select onChange={e => setRating(e.target.value)}>
            <option>{rating}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
}
