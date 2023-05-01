import React, { useContext } from "react";
import FavoriteContext from "../context/FavouriteContext";
import styles from "../../styles/main.module.css";
import { Box } from "@mui/material";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RemoveIcon from '@mui/icons-material/Remove';


const Favourite = ({vacation}) => {
  const { removeItem } = useContext(FavoriteContext);

  return (
    <Box
      className={styles.singleDestination}
      key={vacation.id}
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
            onClick={() => removeItem(vacation.id)}
          >
           <RemoveIcon/>
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
};

export default Favourite;
