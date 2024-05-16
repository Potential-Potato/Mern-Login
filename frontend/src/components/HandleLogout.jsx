import React from 'react';
import axios from 'axios';

const HandleLogout = () => {
    const handleLogout = async () => {
        try {
            await axios.get('/logout');
            window.location.href = '/login'; // Redirect after successful logout
        } catch (error) {
            console.error('Logout failed:', error);
            // window.location.href = '/login';
        }
    };

    return (
        <a href="/logout" onClick={handleLogout}>
        LogOut
        </a>
    );
}

export default HandleLogout;
