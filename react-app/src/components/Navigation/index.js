import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
// import NotificationButton from './NotificationButton';
import './Navigation.css';
import SearchBar from './searchBar';
import logo from '../Photos/lscxLogo.png';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);



	return (
		<nav className='navBar-container'>
			<div className='navigationBar'>

					<div className='nav-logo'>
						<div><NavLink to="/"><img className="logo-img" src={logo}></img></NavLink></div>
					</div>

					<SearchBar/>

				{(sessionUser === null) ?
				<div className='navBar-right'>
						<div className='signup-button-div'>
							<NavLink className='signup-button' exact to='/signup'>Sign Up</NavLink>
						</div>
						<div className='login-button-div'>
							<NavLink className='login-button' exact to='/login'>Log In</NavLink>
						</div>
				</div>
				:
				<div className='navBar-right'>
					{/* <div className='notifs'>
						<NotificationButton user={sessionUser}/>
					</div> */}
					<div className='user-profile'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
				}

			</div>
		</nav>
	);
}

export default Navigation;
