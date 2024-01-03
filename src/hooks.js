"use client"
import { createContext, useState } from 'react';

const Authinication=createContext({})

export const MyAuthProvider=({children})=>{

    const [token, setToken] = useState(false);
    const [userData, setUserData] = useState("");
    const URL="https://track-expense-tauri.vercel.app";

    return(
        <Authinication.Provider value={{token,setToken,userData,setUserData,URL}}>
            {children}
        </Authinication.Provider>
    )
}

export default Authinication;