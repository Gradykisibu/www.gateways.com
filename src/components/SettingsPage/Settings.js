import * as React from "react";
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
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebase";

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
  const [ user, setUser ] = React.useState({});
  const initial = user



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data.displayName);
    });
  }, []);
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
          mt: "10px",
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
          <Avatar
            sx={{ width: 56, height: 56 }}
          >
            {initial[0]}
          </Avatar>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "enter",
            justifyContent: "center",
            fontWeight:"bold",
          }}
        >
          {/* [{user}] */}
        </Box>
      </Box>

      <Box  sx={{ flexGrow: 1,bgcolor: "rgb(240, 240, 246)", display: 'flex', height: "90vh"}}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "100px" }}
        >
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="User Info" {...a11yProps(1)} />
          <Tab label="Theme" {...a11yProps(2)} />
          <Tab label="Password" {...a11yProps(3)} />
          <Tab label="Delete Account" {...a11yProps(4)} />
        </Tabs>

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
    </Box>
  );
}
