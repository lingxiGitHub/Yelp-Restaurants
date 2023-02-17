import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getProfileThunk } from "../store/userprofile";
import {getAllReviewsByUserId} from "../store/reviewsReducer";

export default function UserProfilePage(){
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.user)
    const loggedInUser = useSelector((state) => state.session.user)
    const restaurants = useSelector(state => state.restaurant.newState)
    const reviews = Object.values(useSelector((state) => state.reviews.newState))
    const {userId} = useParams()

    useEffect(() => {
        dispatch(getProfileThunk(userId))
        dispatch(getAllReviewsByUserId(userId))
    }, [dispatch]);

    const ratings = (num) => {
        if(num === 5){
            return (<div>⭐️⭐️⭐️⭐️⭐️</div>)
        } else if(num === 4){
            return (<div>⭐️⭐️⭐️⭐️</div>)
        } else if(num === 3){
            return (<div>⭐️⭐️⭐️</div>)
        } else if(num === 2){
            return (<div>⭐️⭐️</div>)
        } else if(num === 1){
            return (<div>⭐️</div>)
        }
    }
    if(!user){
        return (
            <h2>Loading ...</h2>
        )
    }

    return (
        <div className="mainlayer">
            <div className="deetscontainer">
                <div className="topmost">
                    <div className="userinfo">
                        <img className="profpic" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
                        <div className="stats">
                            <div className="name">
                                {user.username}
                            </div>
                            <div className="reviews">{reviews.length} {reviews.length === 1 ? 'review': 'reviews'}</div>
                        </div>
                    </div>
                </div>
                <div className="below profpic">{loggedInUser.username}'s Profile</div>
            </div>
                <div className="midpart">Reviews</div>
                    {reviews.map(review => (
                        <div className="width">
                            <div className="reviewscontainer">
                                {/* <NavLink to {`/:restaurantId/${review.restaurant.id}`}> */}
                                    {/* <p className="restaurantname">{review.restaurant.name}</p>
                                </NavLink> */}
                                <div className="amountstars">{ratings(review.ratings)}</div>
                                <p className="showit">{review.review}</p>
                            </div>
                        </div>
                    ))}
        </div>
    )
}
