import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../styles/upcoming.module.css";
import { Box } from "@mui/material";
import { db } from "@/Firebase/firebase";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Upcoming() {
  const darkTheme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [upcomingData, setUpcomingData] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const FirstInitial = user;

  React.useEffect(() => {
    const q = query(collection(db, "Upcoming"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let UpcomingArray = [];
      querySnapshot.forEach((doc) => {
        UpcomingArray.push({ ...doc.data() });
      });
      setUpcomingData(UpcomingArray);
    });
    return () => unsub();
  }, []);

  const handleExpandClick = (title) => {
    console.log(title, "title")
    if(title){
      setExpanded(!expanded);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "30px",
        background: darkTheme && "#000",
      }}
    >
      <Box className={styles.title} sx={{border: darkTheme ? "1px solid #fff" : "1px solid #000", color:darkTheme ? "#fff" : "#000"}}>
        <p>Best Upcoming Vacations 2023</p>
      </Box>
      <p className={styles.TotalVacations} style={{ color:darkTheme ? "#fff" : "#000"}}>
        TOTAL UPCOMING VACATIONS: {upcomingData.length}
      </p>

      <Box className={styles.Cards}>
        {upcomingData.map((upcoming) => {
          return (
            <Card key={upcoming.id} sx={{ maxWidth: 345, mt: 5 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ background: "black" }} aria-label="recipe">
                    {FirstInitial.email[0]}
                  </Avatar>
                }
                title={upcoming.country}
                subheader={upcoming.date}
              />
              <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", textTransform:"uppercase", fontWeight:"bold", fontSize:"13px"}}>
              <p>{upcoming.title}</p>
              </Box>
              <CardMedia
                component="img"
                height="194"
                image={upcoming.imgSrc}
                alt=""
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" className={styles.Description}>
                  {upcoming.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
