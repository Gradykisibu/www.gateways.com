import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from "next/router";


const ProtectedRoutes = ({ children }) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    if(!user){
        router.push("/signup");
    }
  return children;
}

export default ProtectedRoutes;