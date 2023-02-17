import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './searchBar';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	// const history = useHistory()

	// console.log(sessionUser)



	return (
		<nav className='navBar-container'>
			<div className='navigationBar'>
				<div className='navBar-left'>
					<div className='nav-logo'>
						<NavLink className='homeButton' exact to="/">Home</NavLink>
					</div>

					<SearchBar/>

				{(sessionUser === null) ?
				<div className='navBar-right'>
					<div className='login-button-div'>
						<NavLink className='login-button' exact to='/login'>Log In</NavLink>
					</div>

					<div className='signup-button-div'>
						<NavLink className='signup-button' exact to='/signup'>Sign Up</NavLink>
					</div>
				</div>
				:
				<div className='navBar-right'>
					<div className='user-profile'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
				}
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
