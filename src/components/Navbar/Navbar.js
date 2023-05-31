import React, { useContext } from "react";
import { Box } from "@mui/material";
import AirlinesIcon from "@mui/icons-material/Airlines";
import Link from "next/link";
import styles from "../../styles/navbar.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/Firebase/firebase";
import FadeMenu from "./Menu/Menu";
import MoonLoader from "react-spinners/MoonLoader";
import FavoriteContext from "../context/FavouriteContext";
import { useTheme } from "../context/ThemeContext";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

const Navbar = () => {
  const router = useRouter();
  const [loader, setLoader] = React.useState(false);
  const [color, setColor] = React.useState("#ffffff");
  const [user, setUser] = React.useState({});
  const { favouriteItem, showHideFavourite } = useContext(FavoriteContext);
  const darkTheme = useTheme(); 

  const userSignOut = () => {
    setLoader(true);
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    setLoader(false);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
  }, []);

  return (
    <Box className={styles.header} sx={{background: darkTheme ? "#000" : "hsl(0, 0%, 93%)", color:darkTheme && "#fff"}}>
      <Box className={styles.logoDiv}>
        <Link href="/" className={styles.logo} sx={{color:darkTheme && "#fff"}}>
          <h1>
            <AirlinesIcon className={styles.icon} /> GateWays
          </h1>
        </Link>
      </Box>

      <Box className={styles.navUl}>
        <Box className={styles.NavItem} sx={{ color:darkTheme && "#fff"}}>
          <HomeOutlinedIcon fontSize="small" />
          <Link href="/" className="navLink">
            <p>Home</p>
          </Link>
        </Box>

        <Box sx={{ flexDirection: "column" }} className={styles.NavItem}>
          <Box>
            {favouriteItem.length > 0 && (
              <Box
                sx={{
                  fontSize: "9px",
                  height: "8px",
                  marginRight: "60px",
                  marginTop: "-12px",
                  borderRadius: "50px",
                  width: "15px",
                  height: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  background: "red",
                }}
              >
                <span>{favouriteItem.length}</span>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FavoriteBorderOutlinedIcon fontSize="small" />
            <Link href="addToFavourite" className="navLink">
              <p onClick={showHideFavourite}>Favourites</p>
            </Link>
          </Box>
        </Box>

        <Box className={styles.NavItem}>
          <ArticleOutlinedIcon />
          <Link href="newsRoom" className="navLink">
            <p>News</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <SupportAgentOutlinedIcon fontSize="small" />
          <Link href="supportChat" className="navLink">
            <p>Support</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <NotificationsOutlinedIcon />
          <Link href="upcoming" className="navLink">
            <p>Upcoming</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <MarkChatUnreadOutlinedIcon />
          <Link href="comments" className="navLink">
            <p>Comments</p>
          </Link>
        </Box>

        <Box className={styles.NavItem}>
          <SettingsOutlinedIcon />
          <Link href="settings" className="navLink">
            <p>Settings</p>
          </Link>
        </Box>

        <Box className={styles.logoutbtn} sx={{background: darkTheme ? "#fff" : "#000", color:darkTheme ? "#000" : "#fff"}}>
          {user ? (
            <button onClick={userSignOut}>
              {loader ? <MoonLoader size={20} color={color} /> : "Logout"}
            </button>
          ) : (
            <Link href="login">
            <button>
              {loader ? <MoonLoader size={20} color={color} /> : "Login"}
            </button>
            </Link>
          )}
        </Box>
      </Box>

      <Box className={styles.sideIcon}>
        <FadeMenu />
      </Box>
    </Box>
  );
};

export default Navbar;
