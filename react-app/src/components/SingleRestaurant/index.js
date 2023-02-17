import "./SingleRestaurant.css"
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getSingleRestaurant } from "../../store/restaurants"
// import singleRestaurant from "../../data/single-restaurant.json"
import AddPhotoModal from "../AddPhotoModal";
import OpenModalButton from "../OpenModalButton";
import EditRestaurant from "../EditRestaurantModal";
import DeleteRestaurant from "../DeleteRestaurant";
// import DeletePhoto from "../DeletePhotoModal";
import GetAllReviews from "../Reviews/GetAllReviews";


function SingleRestaurant() {
    const history = useHistory();
    const { restaurantId } = useParams()
    // console.log("restaurantId at component", restaurantId)

    const singleRestaurant = useSelector((state) => {
        // console.log("singleRestaurantState", state)
        return state.Restaurants.singleRestaurant
    })
    // console.log("singleRestaurant at component", singleRestaurant)


    // console.log("here???")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleRestaurant(+restaurantId)).then(() => setIsLoaded(true));

        // setIsLoaded(true)
    }, [dispatch, restaurantId])

    // console.log("end here???")


    const [isLoaded, setIsLoaded] = useState(false);

    // const [showEdit, setShowEdit] = useState(false);
    const [showDeleteEdit, setShowDeleteEdit] = useState(false)
    // const [showCreateReviewEdit, setShowCreateReviewEdit] = useState(false)

    const sessionUser = useSelector(state => state.session.user);


    return (
        <>

            {isLoaded && (
                <div>
                    <h1>{singleRestaurant.name}</h1>
                    <div className="summary-line">
                        <span> ★{singleRestaurant.avgStarRating}</span>
                        <span>{singleRestaurant.numReviews} reviews</span>



                    </div>


                    {sessionUser && (
                        <>
                            <div>
                                <OpenModalButton
                                    buttonText="Add Photo"
                                    // onItemClick={closeMenu}

                                    modalComponent={<AddPhotoModal restaurantId={restaurantId} />}
                                />
                            </div>
                            <div>
                                <OpenModalButton
                                    buttonText="Edit Restaurant"
                                    modalComponent={<EditRestaurant singleRestaurant={singleRestaurant} />}
                                />

                            </div>
                            <button
                                onClick={() => setShowDeleteEdit(!showDeleteEdit)}
                            >Delete Restaurant</button>

                            {showDeleteEdit && (
                                <DeleteRestaurant
                                    singleRestaurant={singleRestaurant}
                                    sessionUser={sessionUser}
                                    dispatch={dispatch}
                                    history={history}
                                    restaurantId={restaurantId}
                                    setShowDeleteEdit={setShowDeleteEdit}

                                />
                            )}
                        </>
                    )}








                    <div className="side-bar">
                        <span>{singleRestaurant.website}</span>
                        <span>{singleRestaurant.phone_number}</span>
                        <span>{singleRestaurant.address}</span>
                        <span>{singleRestaurant.city}</span>
                        <span>{singleRestaurant.state}</span>
                        <span>{singleRestaurant.country}</span>
                    </div>
                    <div className="photos">

                        {

                            singleRestaurant.restaurantImages.map(image => {

                                return (
                                    <img className="singlePhoto" alt="" key={image.id} src={image.url} />
                                )
                            })
                        }

                    </div>

                    <h2>Amenities and More</h2>
                    <div>Takes Reservations</div>
                    <div>Offers Delivery</div>
                    <div>Offers Takeout</div>
                    <div>Accepts Credit Cards</div>

                    <hr></hr>
                    <h2>About the Business</h2>
                    <p>{singleRestaurant.description}</p>
                    <hr></hr>
                    < GetAllReviews restaurantId={restaurantId} />
                </div>
            )}
        </>
    )
}

export default SingleRestaurant
