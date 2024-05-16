import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import HandleLogout from './HandleLogout'

import '../assets/nav-bar.css'

export default function Navbar() {
  const { user } = useContext(UserContext); // Access user context to check authentication status

  return (
    <nav className='nav-bar'>
      <Link to={'/'}>Home</Link> 
      {/* Conditionally render the "Dashboard" link if the user is logged in */}
      {user ? (
        <>
          <Link to={'/dashboard'}>Dashboard</Link>
          <Link to={'/post'}>Post</Link>
          <HandleLogout/>
        </>
      ) : (
        // Render the "Login" and "Register" links if the user is not logged in
        <>
          <Link to={'/login'}>Login</Link> 
          <Link to={'/register'}>Register</Link>
        </>
      )}
    </nav>
  );
}




