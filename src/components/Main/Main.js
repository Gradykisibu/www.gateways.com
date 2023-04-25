import React, { useState, useEffect , useContext} from "react";
import { Box } from "@mui/material";
import styles from "../../styles/main.module.css";
import { db } from "@/Firebase/firebase";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AOS from "aos";
import "aos/dist/aos.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from "../context/AuthContext";



const Main = () => {
  const [vacationData, setVacationData] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const q = query(collection(db, "Vacations"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let vacationsArray = [];
      querySnapshot.forEach((doc) => {
        vacationsArray.push({ ...doc.data() });
      });
      setVacationData(vacationsArray);
      console.log(vacationData, "data");
    });
    return () => unsub();
  }, []);

  
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleSave = () => {
    console.log("Favourite")
    setFavourite(true)
  }

  return (
    <Box>
      <Box className={styles.header}>
        <h1 className={styles.headerText}>Our popular destinations</h1>
      </Box>

      <Box className={styles.cardContainer}>
        {vacationData.map((vacation) => {
         return(
          <Box
          className={styles.singleDestination}
          key={vacation.id}
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
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

            <Box 
            className={styles.favouriteIcon}
            onClick={() => handleSave()}
            >
              {
                favourite ? 

                (<FavoriteIcon/>)
                 : 
                (<FavoriteBorderIcon/>)
              }
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

          <Box className={styles.moreinfor}>
            <p>Details</p>
            <ContentPasteIcon fontSize="10px" />
          </Box>
        </Box>
         )
        })}
      </Box>
    </Box>
  );
};

export default Main;
