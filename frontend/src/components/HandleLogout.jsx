import React from 'react';
import axios from 'axios';

const HandleLogout = () => {
    const handleLogout = async () => {
        try {
            await axios.get('/logout');
            window.location.href = '/login'; // Redirect after successful logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout}>LogOut</button>
    );
}

export default HandleLogout;
