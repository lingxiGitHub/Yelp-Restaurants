// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import OpenModalButton from "../OpenModalButton";
// import notifs from '../Photos/notifsPhoto.png'

// function NotificationButton() {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     const sessionUser = useSelector(state => state.session.user);

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//     const closeMenu = () => setShowMenu(false);


//     return (
//         <>
//         <button onClick={openMenu} className='notification-button'>
//                 <i class="fa-regular fa-bell"></i>
//         </button>

//         <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//         <>
//             <p className='user-dropdown-username'>{user.username}</p>
//             <p className= 'user-dropdown-email'>{user.email_address}</p>
//             <p>
//             <button className='user-logout-button' onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>
//             </p>
//         </>
//         ) : ()
//             // <>
//             //     <OpenModalButton
//             //     buttonText="Log In"
//             //     onItemClick={closeMenu}
//             //     modalComponent={<LoginFormModal />}
//             //     />

//             //     <OpenModalButton
//             //     buttonText="Sign Up"
//             //     onItemClick={closeMenu}
//             //     modalComponent={<SignupFormModal />}
//             //     />
//             // </>
//         }
//         </ul>
//         </>
//     )
// }

// export default NotificationButton;
