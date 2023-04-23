import React from "react";
import { Box } from "@mui/material";
import AirlinesIcon from "@mui/icons-material/Airlines";
import Link from "next/link";
import styles from "../../styles/navbar.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/Firebase/firebase";
import FadeMenu from "./Menu/Menu";
import MoonLoader from "react-spinners/MoonLoader"

const Navbar = () => {
  const router = useRouter();
  const [ loader, setLoader ] = React.useState(false)
  const [ color, setColor ] = React.useState("#ffffff")

  const userSignOut = () => {
    setLoader(true)
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
      setLoader(false)
  };

  return (
    <Box className={styles.header}>
      <Box className={styles.logoDiv}>
        <Link href="/" className={styles.logo}>
          <h1>
            <AirlinesIcon className={styles.icon} /> GateWays.
          </h1>
        </Link>
      </Box>


      <Box className={styles.navUl}>
        <Box className={styles.NavItem}>
          <HomeOutlinedIcon fontSize="small" />
          <Link href="/" className="navLink">
            <p>Home</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <FavoriteBorderOutlinedIcon fontSize="small" />
          <Link href="/" className="navLink">
            <p>Favourites</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <ArticleOutlinedIcon />
          <Link href="/" className="navLink">
            <p>News</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <SupportAgentOutlinedIcon fontSize="small" />
          <Link href="/" className="navLink">
            <p>Support</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <NotificationsOutlinedIcon />
          <Link href="/" className="navLink">
            <p>Upcoming</p>
          </Link>
        </Box>

        <Box className={styles.logoutbtn}>
          <button onClick={userSignOut}>
            {loader ?
            (
              <MoonLoader 
              size={20}
              color={color}
              />
            )
            : 
            (
              "Logout"
            )
            }
          </button>
        </Box>
      </Box>


      <Box className={styles.sideIcon}>
        <FadeMenu/>
      </Box>
    </Box>
  );
};

export default Navbar;
