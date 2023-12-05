"use client"
import { createContext, useState } from 'react';

const Authinication=createContext({})

export const MyAuthProvider=({children})=>{

    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState("");
    const URL="http://localhost:5000";

    return(
        <Authinication.Provider value={{user,setUser,userData,setUserData,URL}}>
            {children}
        </Authinication.Provider>
    )
}

export default Authinication;