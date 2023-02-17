import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const uponLogout = async (e) => {
        await dispatch(logout());
    };
    return <button className='logoutButt' onClick={uponLogout}>Log out</button>
};

export default LogoutButton;
