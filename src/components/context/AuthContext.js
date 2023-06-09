import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebase";

export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [ searchFilter, setSearchFilter ] = useState("");
  const [vacationData, setVacationData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [ reservationData , setReservationData ] = useState([]);

  useEffect(() => {
   onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
  }, []);

const payload = {
    user,
    setUser,
    searchFilter, 
    setSearchFilter,
    vacationData, 
    setVacationData,
    newsData,
    setNewsData,
    reservationData,
   setReservationData 
}

  return (
   <AuthContext.Provider value={payload}>
    {children}
    </AuthContext.Provider>
   )
};

export default AuthProvider;


