import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@mui/material";
import styles from "../../styles/main.module.css";
import { db } from "@/Firebase/firebase";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteContext from "../context/FavouriteContext";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/router";

const Main = () => {
  const [favourite, setFavourite] = useState(false);
  const { addToFavourite } = useContext(FavoriteContext);
  const { searchFilter, vacationData, setVacationData } =
    useContext(AuthContext);
  const darkTheme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "Vacations"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let vacationsArray = [];
      querySnapshot.forEach((doc) => {
        vacationsArray.push({ ...doc.data() });
      });
      setVacationData(vacationsArray);
    });
    return () => unsub();
  }, []);


  return (
    <Box sx={{ background: darkTheme && "black", padding: "10px" }}>
      <Box className={styles.header}>
        <h1 className={styles.headerText}>Our popular destinations</h1>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          zIndex:"1000px"
        }}
      >

        <Link href={"/viewMore"}>
        <Box
          sx={{
            width: "200px",
            border:darkTheme ? "1px solid white" : "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            textTransform: "uppercase",
            cursor:"pointer",
            color: darkTheme ? "white" : "black",
          }}
        >
          view more
        </Box>
        </Link>
      </Box>

      <Box className={styles.cardContainer}>
        {vacationData
          .filter((vacation) => {
            return searchFilter.toLowerCase() === ""
              ? vacation
              : vacation.location.toLowerCase().includes(searchFilter);
          })
          .map((vacation, index) => {
            if (index >= 8) {
              return;
            }
            return (
              <Box
                className={styles.singleDestination}
                key={(vacation.id, index)}
              >
                <Box className={styles.imageDiv}>
                  <img
                    className={styles.image}
                    src={vacation.imgSrc}
                    style={{ width: "300px", height: "200px" }}
                  />
                </Box>

                <Box className={styles.cardInfo}>
                  <Box>
                    <h4 className={styles.destTitle}>{vacation.destTitle}</h4>
                    <span className={styles.continent}>
                      <LocationOnOutlinedIcon />
                      <span className={styles.name}>{vacation.location}</span>
                    </span>
                  </Box>

                  <Box className={styles.moreinfor}>
                    <Box
                      className={styles.favouriteIcon}
                      onClick={() => {
                        addToFavourite(vacation), setFavourite(true);
                      }}
                    >
                      <FavoriteIcon />
                    </Box>

                    <Box></Box>
                    <Link href={"/Details/" + vacation.id}>
                      <InfoIcon />
                    </Link>
                  </Box>
                </Box>

                <Box className={styles.fees}>
                  <Box className={styles.grade}>
                    <span>
                      {vacation.grade}
                      <small>+1</small>
                    </span>
                  </Box>
                  <Box className={styles.price}>
                    <h5>R{vacation.price}</h5>
                  </Box>
                </Box>

                <Box className={styles.description}>
                  <p>{vacation.description}</p>
                </Box>
              </Box>
            );
          })}
      </Box>

     
    </Box>
  );
};

export default Main;
