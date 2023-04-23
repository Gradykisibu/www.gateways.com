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
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/Firebase/firebase";

export default function FadeMenu() {
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
            <Link href="/" className="navLink">
              <p>Favourites</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <ArticleOutlinedIcon />
            </Box>

            <Box className={styles.Text}>
            <Link href="/" className="navLink">
              <p>News</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box >
            <SupportAgentOutlinedIcon fontSize="small" />
            </Box>

            <Box className={styles.Text}>
            <Link href="/" className="navLink">
              <p>Support</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.NavItem}>
            <Box>
            <NotificationsOutlinedIcon />
            </Box>

            <Box className={styles.Text}>
            <Link href="/" className="navLink">
              <p>Upcoming</p>
            </Link>
            </Box>
          </MenuItem>

          <MenuItem className={styles.logoutbtn}>
            <Box>
              <LogoutOutlinedIcon/>
            </Box>

            <Box className={styles.Text}>
            <button onClick={userSignOut}>Logout</button>
            </Box>
          </MenuItem>

      </Menu>
    </div>
  );
}
