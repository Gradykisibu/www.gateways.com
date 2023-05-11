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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "../../styles/upcoming.module.css";
import { Box } from "@mui/material";
import { db } from "@/Firebase/firebase";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
      }}
    >
      <Box className={styles.title}>
        <p>Best Upcoming Vacations 2023</p>
      </Box>
      <p className={styles.TotalVacations}>
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
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
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
                <Typography variant="body2" color="text.secondary">
                  {upcoming.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{upcoming.about}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
