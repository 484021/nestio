'use client'
import {createContext, useContext, useState} from 'react';

//Create context
const GlobalContext = createContext();

//Create provider
export const GlobalProvider = ({children}) => {
    const [unreadCount, setUnreadCount] = useState(0);

    
    return (
        <GlobalContext.Provider value={{
            unreadCount, setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

//Create custom hook to access context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}
