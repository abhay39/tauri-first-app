"use client"
import { createContext, useState } from 'react';

const Authinication=createContext({})

export const MyAuthProvider=({children})=>{

    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState("");
    const URL="https://expensetracker-orcin.vercel.app";

    return(
        <Authinication.Provider value={{user,setUser,userData,setUserData,URL}}>
            {children}
        </Authinication.Provider>
    )
}

export default Authinication;