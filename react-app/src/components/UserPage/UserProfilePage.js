import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getProfileThunk, editProfileThunk, deleteProfileThunk } from "../../store/userprofile";
import { getAllReviewsByUserId } from "../../store/reviewsReducer";
import OpenModalButton from "../OpenModalButton";
import { logout } from "../../store/session"
import "./UserProfilePage.css"
import starpic from './star.png'
import UpdateProfile from "./UpdateProfile";

export default function UserProfilePage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const sessionUser = useSelector(state => {
        return state.session.user
    })
    // console.log("sessionUser", sessionUser)
    const { userId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getProfileThunk(userId)).then(() => {
            return setIsLoaded(true)
        });
    }, [dispatch]);


    let reviews = []

    let user = useSelector((state) => state.user)
    // console.log("user", user)

    if (isLoaded) {
        let userTotalReviews = user.user.reviews
        reviews = Object.values(userTotalReviews);
    }

    // console.log("reviews", reviews)

    const handleUpdate = (profile, userId) => async (e) => {
        await dispatch(editProfileThunk(userId))
        history.push(`/users/${userId}/edit`)
    }
    const handleDelete = (userId) => async (e) => {
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
                            <div className="portrait-and-info">
                                <img className="user-portrait" src={`${user.user.portrait}`} alt="" />
                                {/* <img className="user-portrait" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
                                <div className="stats">
                                    <div id="name">
                                        {user.user.username}
                                    </div>
                                    <div id="reviews">
                                        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                                    </div>

                                </div>
                            </div>
                            {sessionUser && user.user.id == sessionUser.id ?
                                <div className="update-userprofile">
                                    <i class="far fa-edit"></i>
                                    <OpenModalButton
                                        buttonText="Update Your Profile"
                                        // onItemClick={closeMenu}
                                        className="update-profile-button"
                                        modalComponent={<UpdateProfile user={user.user} />}
                                    /></div> : ""}
                        </div>
                    </div>
                    {/* {sessionUser !== null && sessionUser.id === parseInt(userId) && <div className="belowprofpic">
                    {sessionUser.username}'s Profile
                </div>} */}
                </div>

                <div>
                    <div class="horizontalline">
                        <div className="midpart">Reviews</div>
                        {/* <hr class="horizontal" /> */}
                        {/* <hr className="inbetween"></hr> */}
                    </div>
                    {reviews.map(rev => (
                        <div className="width" key={rev.id}>



                            <div className="reviewscontainer">
                                <NavLink to={`/single/${rev.restaurant_id}`}>
                                    <p className="restaurantname">{rev.restaurant.name}</p>
                                </NavLink>
                                <div className="amountstars">Rating:  {ratings(parseInt(rev.rating))}</div>
                                <p className="showit">Review:</p><div>{rev.review}</div>
                                <div><hr className="inbetween"></hr></div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        ))
}
