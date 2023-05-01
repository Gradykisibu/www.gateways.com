import React, { useContext } from "react";
import FavoriteContext from "@/components/context/FavouriteContext";
import { Box } from "@mui/material";
import Favourite from "@/components/Favourite/Favourite";
import styles from "../styles/favourites.module.css";

const addToFavourite = () => {
  const { showFavourite, favouriteItem } = useContext(FavoriteContext);
   
    
  return (
    <>
      {showFavourite && (
        <Box className={styles.noFavAdded}>
          {favouriteItem.length === 0 ? (
            <Box sx={{ marginTop:"200px"}}>
              <h1>YOU HAVE NO FAVOURITE VACATIONS SAVED</h1>
            </Box>
          ) : (
            <Box className={styles.addFav}>
              {favouriteItem.map((vacation) => (
                <Favourite key={vacation.id} vacation={vacation}/>
              ))}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default addToFavourite;
