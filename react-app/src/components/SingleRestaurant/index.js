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
import RatingStar from "../RatingStar";


function getMap(str) {
    return str.replaceAll(" ", "+")
}

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

    const photoIcon = (<svg width="24" height="24" class="icon_svg"><path d="M16 2a1 1 0 01.95.68L17.72 5H20a3 3 0 013 3v11a3 3 0 01-3 3H4a3 3 0 01-3-3V8a3 3 0 013-3h2.28l.77-2.32A1 1 0 018 2h8zm-.72 2H8.72L8 6.32A1 1 0 017 7H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1h-3a1 1 0 01-.95-.68L15.28 4zM12 7.5a5.5 5.5 0 015.5 5.5 5.51 5.51 0 01-5.5 5.5 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"></path></svg>)



    return (
        <>

            {isLoaded && (

                <div className="single-page-container">
                    <div className="top-section">

                        <div className="photos">

                            {

                                singleRestaurant.restaurantImages.map(image => {

                                    return (
                                        <img className="singlePhoto" alt="" key={image.id} src={image.url} />
                                    )
                                })
                            }

                        </div>
                        <div className="summary-line">

                            <h1>{singleRestaurant.name}</h1>

                            <div className="one-line-review">
                                <span><RatingStar size="32" rating={singleRestaurant.avgStarRating} /></span>
                                <span className="num-reviews">{singleRestaurant.numReviews} reviews</span>
                            </div>
                            <div className="price">Unclaimed <b>·</b> {singleRestaurant.price}</div>
                            <div className="price"><span className="single-green-word">Open</span> until 9:30PM</div>
                        </div>
                    </div>


                    <div className="bottom-section">

                        <div className="bottom-left-section">

                            {sessionUser && (
                                <><div className="buttons">

                                    <OpenModalButton
                                        buttonText="Add photo"
                                        // onItemClick={closeMenu}
                                        modalComponent={<AddPhotoModal restaurantId={restaurantId} />}
                                    />


                                    <OpenModalButton
                                        buttonText="Edit Restaurant"
                                        modalComponent={<EditRestaurant singleRestaurant={singleRestaurant} />}
                                    />


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
                                </div>
                                </>

                            )}




                            <div className="restaurant-details">
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
                        </div>

                        <div className="bottom-right-section">
                            <div className="side-bar">

                                <a className="bottom-border" href={singleRestaurant.website}>{singleRestaurant.website}</a>

                                <div className="bottom-border">{singleRestaurant.phone_number}</div>
                                <div className="map-direction">
                                    <a href={getMap("https://www.google.com/maps/place/" + singleRestaurant.address + " " + singleRestaurant.city + " " + singleRestaurant.state + " " + singleRestaurant.zipcode)}>Get Direction</a>
                                    <div>
                                        <span>{singleRestaurant.address}, </span>
                                        <span>{singleRestaurant.city}, </span>
                                        <span>{singleRestaurant.state}, </span>
                                        <span>{singleRestaurant.zipcode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}



export default SingleRestaurant
