import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// Create a new context for user data
export const UserContext = createContext({});

// UserContextProvider component
export function UserContextProvider({children}) {
    // State to hold the user data
    const [user, setUser] = useState(null);

    // useEffect hook to fetch user data when the component mounts
    useEffect(() => {
        // Check if user data is not already available
        if (!user) {
            // Fetch user data from the server
            axios.get('/profile').then(({data}) => {
                // Update the user state with fetched data
                setUser(data);
            });
        }
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Render the UserContext.Provider, providing the user state and setUser function as context value
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* Render children components */}
        </UserContext.Provider>
    );
}
