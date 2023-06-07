import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@mui/material";
import styles from "../../styles/main.module.css";
import style from "../../styles/banner.module.css";
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

const ViewMore = () => {
  const [favourite, setFavourite] = useState(false);
  const { addToFavourite } = useContext(FavoriteContext);
  const { searchFilter, vacationData, setVacationData, setSearchFilter } =
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
        <h1 className={styles.headerText}>Live vacations</h1>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            width: "60%",
            border: "2px solid black",
            paddingLeft: "10px",
            height:"40px"
          }}
          onChange={(e) => setSearchFilter(e.target.value)}
          type="text"
          placeholder="Search vacation..."
        />
      </Box>

      <Box className={styles.cardContainer}>
        {vacationData
          .filter((vacation) => {
            return searchFilter.toLowerCase() === ""
              ? vacation
              : vacation.destTitle.toLowerCase().includes(searchFilter);
          })
          .map((vacation, index) => {
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

export default ViewMore;
