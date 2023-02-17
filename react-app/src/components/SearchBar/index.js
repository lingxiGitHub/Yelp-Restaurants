import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { search_restaurants } from '../../store/restaurants';

import './SearchBar.css';

function RestaurantBySearch() {
    const dispatch = useDispatch()
    const { keyword } = useParams();
    console.log('@!@!@', keyword)

    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(search_restaurants(keyword))
    }, [dispatch, keyword])

    const restaurant = useSelector(state => state.Restaurants.searchedRestaurants)
    const restaurantArr = Object.values(restaurant)

    if(!restaurantArr) return null


    return restaurantArr &&(
        <div className='search-restaurants-container'>
            <div className='search-captions-container'>
                <div className='search-captions'>
                {restaurantArr?.length > 0 ?
                    <><div className='search-cap'> {restaurantArr?.length} search results for "{keyword}"</div><span className='search-cap'></span></>
                    :
                    <><div className='search-cap'> We couldn't find any results for "{keyword}"</div><span className='search-cap'> &nbsp;</span><div className='search-again-message'>Let's try finding another restaurant!</div></>
                }
                </div>
            </div>
            <div className='search-box'>
                <div className='search-restaurant-box'>

                {restaurantArr?.map((el, i) => {
                    // console.log('el from restaurant array mapping', el)
                    return (
                    <div className='search-restaurant-body'>
                        <NavLink to={`/${el?.id}`}  key={i}>
                            <div className='prevImage-box'>
                                <img src={el?.previewImage} className='prevImage' alt='images'></img>
                            </div>
                            <div className='restaurant-infooooo'>
                                <div className='restaurant-info1'>
                                    <div className='search-restaurant-name'><strong>{el.name}</strong></div>
                                    <div className='avgRating'><i class="fa-solid fa-star"></i> is this possible ?</div>
                                    <div className='search-restaurant-price-city'>{el.price} · {el.city}</div>
                                </div>
                                <div className='restaurant-info2'>
                                    <p className='owned&operated'> <i class="fa-solid fa-people-roof"></i> Family-owned and operated · <i class="fa-regular fa-map"></i> Locally owned & operated</p>
                                <div className='waitlist-div'>
                                    <p><i class="fa-regular fa-clock"></i> Waitlist opens at 2pm</p>
                                </div>
                                {/* <div className='review-div'></div> */}
                                </div>
                                <div className='restaurant-info3'>
                                    <p><i className='checkmark' class="fa-sharp fa-solid fa-check"></i>Outdoor Seating </p>
                                    <p> <i className='checkmark' class="fa-sharp fa-solid fa-check"></i> Delivery </p>
                                    <p> <i className='checkmark' class="fa-sharp fa-solid fa-check"></i> Takeout</p>
                                </div>
                            </div>
                        </NavLink>

                    </div>
                    )
                    })}
                </div>
            </div>
    </div>
  )
}

export default RestaurantBySearch
