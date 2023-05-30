import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserInfor from "../SettingsTabs/UserInfor";
import DeleteAccount from "../SettingsTabs/DeleteAccount";
import Theme from "../SettingsTabs/Theme";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearAllIcon from "@mui/icons-material/ClearAll";

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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState({});
  const [isOpen, setIsOpen] = useState(false);
  const initial = user;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data.displayName);
    });
  }, []);

  const handleCloseDrawer = () => {
    setIsOpen(true);
  };

  const handleOpenDrawer = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "rgb(240, 240, 246)",
        display: "flex",
        height: "90vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          pt: "10px",
          width: "100%",
          height: "150px",
          display: "flex",
          alignItems: "enter",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Stack
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }}>{initial[0]}</Avatar>
        </Stack>

        <Box sx={{ width: "100%", display: "flex", height: "70%", mt: "10px" }}>
          <Box
            sx={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "#000",
              height: "100%",
            }}
          >
            {isOpen ? (
              <button onClick={() => handleOpenDrawer()}>
                <ClearAllIcon />
              </button>
            ) : (
              <button onClick={() => handleCloseDrawer()}>
                <DehazeIcon />
              </button>
            )}
          </Box>
        </Box>
      </Box>

      {isOpen ? (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "rgb(240, 240, 246)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "90vh",
            width: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* <Tab label="User Info" {...a11yProps(0)} /> */}
            <Tab label="Theme" {...a11yProps(0)} />
            <Tab label="Delete Account" {...a11yProps(1)} />
          </Tabs>
        </Box>
      ) : (
        <Box>
          {/* <TabPanel value={value} index={0}>
            <UserInfor />
          </TabPanel> */}
          <TabPanel value={value} index={0}>
            <Theme />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DeleteAccount />
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}
