import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getProfileThunk, editProfileThunk, deleteProfileThunk } from "../../store/userprofile";
import { getAllReviewsByUserId } from "../../store/reviewsReducer";
import {logout} from "../../store/session"
import "./UserProfilePage.css"
import starpic from './star.png'
import human from './human.png'

export default function UserProfilePage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => {
        return state.session.user
    })
    // console.log("sessionUser", sessionUser)
    const { userId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getProfileThunk(userId)).then(() =>
        {
            return setIsLoaded(true)
        });
    }, [dispatch]);


    let reviews = []

    let user =  useSelector((state) => state.user)
    // console.log("user", user)

    if(isLoaded){
        let userTotalReviews = user.user.reviews
        reviews = Object.values(userTotalReviews);
    }

    // console.log("reviews", reviews)

    const handleUpdate = (profile, userId) => async (e) => {
        await dispatch(editProfileThunk(userId))
        history.push(`/users/${userId}/edit`)
    }
    const handleDelete = (userId) => async(e) => {
        await dispatch(deleteProfileThunk(userId))
        await dispatch(logout());
        history.push('/')
    }


    const ratings = (num) => {
        if (num === 5) {
            return (<div><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /></div>)
        } else if (num === 4) {
            return (<div><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /></div>)
        } else if (num === 3) {
            return (<div><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /></div>)
        } else if (num === 2) {
            return (<div><img className="yelpstar" src={starpic} alt="" /><img className="yelpstar" src={starpic} alt="" /></div>)
        } else if (num === 1) {
            return (<div><img className="yelpstar" src={starpic} alt="" /></div>)
        }
    }
    // if (!sessionUser) {
    //     return (
    //         <h2>Loading ...</h2>
    //     )
    // }

    return (
        isLoaded && (
        <div className="mainlayer">
            <div className="deetscontainer">
                <div className="topmost">
                    <div className="userinfo">
                        <img className="profpic" src={human}/>
                        <div className="stats">
                            <div className="name">
                                {user.user.first_name} {user.user.last_name}
                            </div>
                            <div className="reviews">
                                <img className="yelpstar" src={starpic}/>
                                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </div>
                        </div>
                    </div>
                </div>
                {/* {sessionUser !== null && sessionUser.id === parseInt(userId) && <div className="belowprofpic">
                    {sessionUser.username}'s Profile
                  
                </div>} */}
            </div>


            <div class="horizontalline">
                <div className="midpart">Reviews</div> <hr class="horizontal"/>
            </div>
            {reviews.map(rev => (
                <div className="width">
                    <div className="reviewscontainer">
                        <NavLink to={`/${rev.restaurant_id}`}>
                            <p className="restaurantname">{rev.restaurant.name}</p>
                        </NavLink>
                        <div className="amountstars">Rating:  {ratings(parseInt(rev.rating))}</div>
                        <p className="showit">Review:</p><div>{rev.review}</div>
                        <div><hr className="inbetween"></hr></div>
                    </div>
                </div>
            ))}
        </div>
    ))
}
