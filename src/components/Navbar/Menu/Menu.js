import * as React from "react";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import DehazeIcon from "@mui/icons-material/Dehaze";
import styles from "../../../styles/menu.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function FadeMenu() {
  const [user, setUser] = React.useState({});
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
  }, []);

  return (
    <div>
      <Box
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <DehazeIcon />
      </Box>


      <Menu
      sx={{marginTop:"18px", marginLeft:"13px", borderRadius:"0px"}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

          <MenuItem className={styles.NavItem}>
            <Box>
            <HomeOutlinedIcon fontSize="small"/>
            </Box>
            <Box className={styles.Text}>
            <Link href="/" className="navLink">
              <p>Home</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <FavoriteBorderOutlinedIcon fontSize="small"/>
            </Box>

            <Box className={styles.Text}>
            <Link href="/addToFavourite" className="navLink">
              <p>Favourites</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <ArticleOutlinedIcon />
            </Box>

            <Box className={styles.Text}>
            <Link href="/newsRoom" className="navLink">
              <p>News</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box >
            <SupportAgentOutlinedIcon fontSize="small" />
            </Box>

            <Box className={styles.Text}>
            <Link href="/supportChat" className="navLink">
              <p>Support</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <NotificationsOutlinedIcon />
            </Box>

            <Box className={styles.Text}>
            <Link href="/upcoming" className="navLink">
              <p>Upcoming</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <MarkChatUnreadIcon/>
            </Box>

            <Box className={styles.Text}>
            <Link href="/comments" className="navLink">
              <p>Comments</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <SettingsIcon/>
            </Box>

            <Box className={styles.Text}>
            <Link href="/settings" className="navLink">
              <p>Settings</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.logoutbtn}>
            <Box>
              <LogoutOutlinedIcon/>
            </Box>

            <Box className={styles.Text}>
            {user ? (
            <button onClick={userSignOut}>
               Logout
            </button>
          ) : (
            <Link href="login">
            <button>
              Login
            </button>
            </Link>
          )}
            </Box>
          </MenuItem>

      </Menu>
    </div>
  );
}
