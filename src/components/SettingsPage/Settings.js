import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Account from "../SettingsTabs/Account";
import UserInfor from "../SettingsTabs/UserInfor";
import DeleteAccount from "../SettingsTabs/DeleteAccount";
import Theme from "../SettingsTabs/Theme";
import ChangePassword from "../SettingsTabs/ChangePassword";
import styles from "../../styles/settings.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PasswordIcon from "@mui/icons-material/Password";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);
  const [DrawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "rgb(240, 240, 246)",
        display: "flex",
        height: "100vh",
      }}
    >
      {DrawerOpen ? (
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "50px" }}
        >
          <Box
            sx={{
              border: "1px solid black",
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "enter",
              justifyContent: "center",
              background: "black",
              color: "white",
              paddingTop: "9px",
            }}
            onClick={handleCloseDrawer}
          >
            <DehazeIcon />
          </Box>

          {DrawerOpen ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Tooltip title="Account">
                <IconButton>
                  <Tab label={<PersonIcon />} {...a11yProps(0)} />
                </IconButton>
              </Tooltip>

              <Tooltip title="userInfo">
                <IconButton>
                  <Tab label={<InfoIcon />} {...a11yProps(1)} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Theme">
                <IconButton>
                  <Tab label={<DarkModeIcon />} {...a11yProps(2)} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Passowrd">
                <IconButton>
                  <Tab label={<PasswordIcon />} {...a11yProps(3)} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Account">
                <IconButton>
                  <Tab label={<DeleteIcon />} {...a11yProps(4)} />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box>
              <Tab label="Account" {...a11yProps(0)} />
              <Tab label="User Info" {...a11yProps(1)} />
              <Tab label="Theme" {...a11yProps(2)} />
              <Tab label="Password" {...a11yProps(3)} />
              <Tab label="Delete Account" {...a11yProps(4)} />
            </Box>
          )}
        </Tabs>
      ) : (
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Box
            sx={{
              border: "1px solid black",
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "enter",
              justifyContent: "center",
              background: "black",
              color: "white",
              paddingTop: "9px",
            }}
            onClick={handleOpenDrawer}
          >
            <CloseIcon />
          </Box>

          <Box
            sx={{
              border: "1px solid black",
              mt:"10px",
              width: "100%",
              height: "150px",
              display: "flex",
              alignItems: "enter",
              justifyContent: "center",
              flexDirection:"column",
            }}
          >
            <Stack style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </Stack>
            <Box sx={{
                display: "flex",
                alignItems: "enter",
                justifyContent: "center",
            }}>
                <p>User Name</p>
            </Box>
          </Box>
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="User Info" {...a11yProps(1)} />
          <Tab label="Theme" {...a11yProps(2)} />
          <Tab label="Password" {...a11yProps(3)} />
          <Tab label="Delete Account" {...a11yProps(4)} />
        </Tabs>
      )}

      <TabPanel value={value} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserInfor />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Theme />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DeleteAccount />
      </TabPanel>
    </Box>
  );
}
