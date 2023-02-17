import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {createOneReview, fetchAllReviewsByRestaurantId} from '../../../store/reviewsReducer';
import {getSingleRestaurant} from '../../../store/restaurants'
import './createReview.css'
export default function CreateNewReview(){
  let {restaurantId} = useParams();
  restaurantId = parseInt(restaurantId)
  // console.log("createNewReview restaurantId", restaurantId)
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState("3");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    // console.log("handle submit")
    e.preventDefault();
    // setErrors([]);

    const newReview = {
      review,
      rating
    };

    // let something;
    // let errArr = []
    // const newCreatedReview = await dispatch(createOneReview(newReview,restaurantId))
    // console.log("create new review:", newCreatedReview)
    // if (newCreatedReview && !newCreatedReview.errors){
    //   something = await dispatch(getSingleRestaurant(restaurantId))
    // }
    // if(something && !newCreatedReview.errors && !something.error){
    //   const somethingElse = await dispatch(fetchAllReviewsByRestaurantId(restaurantId))
    // }
    // if (newCreatedReview.errors){
    //   errArr = Object.values(newCreatedReview.errors)
    //   console.log("%%% error from create review", errArr)
    //   setErrors(errArr)
    // }
    // if(errArr && !errArr.length){
    //   history.push(`/${restaurantId}`)
    // }
    const newCreatedReview = await dispatch(createOneReview(newReview,restaurantId))
      .then(() => dispatch(getSingleRestaurant(restaurantId)))
      .then(() => dispatch(fetchAllReviewsByRestaurantId(restaurantId)))
      .catch(async (res) => {
        // console.log("error encountered", res)
        // const data = await res.json();
        // console.log("error encountered data", data)
        // if (data && data.errors) setErrors(data.errors);
        if(res && res.errors) setErrors(res.errors)
      });
      // console.log("&&&&&&&&& errors from bad data", errors)
      if (errors.length === 0)
      {
        history.push(`/${restaurantId}`)
      }
  }

  // console.log("errors from create review", errors)

    return (
      <div  className="create-review-container">
        <h2>Create new Review</h2>
        <form onSubmit={handleSubmit} className="create-new-review-form">
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

            <select onChange={e => setRating(e.target.value)} value={rating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
}
