import { Box } from "@mui/material";
import React from "react";
import styles from "../../styles/banner.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';

const Banner = () => {

  const [ price, setPrice ] = React.useState();

  return (
    <Box className={styles.Home}>
      <Box>
        <video className={styles.videoContainer} src="video.mp4" muted autoPlay loop type="video/mp4"></video>
      </Box>

      <Box className={styles.HomeContentContainer}>
        <Box className={styles.textDiv}>
          <span className={styles.smallText}>HOLIDAYS ON GATEWAYS</span>

          <h1 className={styles.homeTitle}>
            <span>SEARCH FOR YOUR VACATION </span>
            <FlightTakeoffOutlinedIcon sx={{marginLeft:"5px", fontSize:"30px"}}/>
          </h1>
        </Box>

        <Box className={styles.cardDivGrid}>
          <Box className={styles.destinationInput}>
            <label className={styles.label} htmlFor="city">
              Search for location:
            </label>
            <Box className={styles.inputContainer}>
              <input className={styles.input} type="text" placeholder="Enter name here..." />
              <Box sx={{color:"black"}}>
              <LocationOnOutlinedIcon fontSize="medium"/>
              </Box>
            </Box>
          </Box>

          <Box className={styles.dateInput}>
            <label className={styles.label} htmlFor="date">
              Select your date:
            </label>
            <Box className={styles.inputContainer}>
              <input className={styles.input} type="date" />
            </Box>
          </Box>

          <Box className={styles.priceRange}>
            <Box className={styles.pricing}>
              <label className={styles.label} htmlFor="price">
                Max price:
              </label>
              <h3 className={styles.total}>R{price}</h3>
            </Box>

            <Box className={styles.inputContainer}>
              <input onChange={(e) => setPrice(e.target.value)} className={styles.input} type="range" max="5000" min="1000" />
            </Box>
          </Box>
        </Box>

        <Box className={styles.filter}>
          <FilterListOutlinedIcon/>
          <span>Filter</span>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
