import React, { useContext, useEffect } from "react";
import FavoriteContext from "@/components/context/FavouriteContext";
import { Box } from "@mui/material";
import Favourite from "@/components/Favourite/Favourite";
import styles from "../styles/favourites.module.css";
import { useTheme } from "@/components/context/ThemeContext";


const addToFavourite = () => {
  const { favouriteItem } = useContext(FavoriteContext);
  const darkTheme = useTheme();
   
  return (
            <Box sx={{
              background:darkTheme && "black",
              color:darkTheme ? "white" : "black",
              width:"100%",
              height:"100vh"
            }}>
              { 
                favouriteItem.length === 0 ? (
                  <Box sx={{ width:"100%", height:"90vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <h1>YOU HAVE NO FAVOURITE VACATIONS SAVED</h1>
                  </Box>
                ) 
                :
                (
                  <Box className={styles.favItems}>
                    {favouriteItem.map((vacation) => (
                      <Favourite key={vacation.id} vacation={vacation}/>
                    ))}
                  </Box>
                )
              }

            </Box>
  );
};

export default addToFavourite;