import React from "react";
import { Box } from "@mui/material";
import AirlinesIcon from "@mui/icons-material/Airlines";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import styles from "../../../styles/newsBanner.module.css";
import { db } from "@/Firebase/firebase";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Link from "next/link";


const NewsBanner = () => {
  const [time, setTime] = React.useState(new Date());
  const [newsData, setNewsData] = React.useState([]);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  React.useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  React.useEffect(() => {
    const q = query(collection(db, "News"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let vacationsArray = [];
      querySnapshot.forEach((doc) => {
        vacationsArray.push({ ...doc.data() });
      });
      setNewsData(vacationsArray);
    });
    return () => unsub();
  }, []);

  return (
    <Box className={styles.mainContainer}>
      <Box sx={{ width: "90%", flexDirection: "column" }}>
        <Box className={styles.innerContainer}>
          <Box className={styles.logo}>
            <AirlinesIcon />
            <h1 style={{ fontSize: "20px" }}>GateWays News.</h1>
          </Box>

          <Box className={styles.weather}>
            <Box>
              <p>Date : {date}</p>
            </Box>

            <Box
              className={styles.dailySun}
            >
              <CloudOutlinedIcon />
              <h1>THE DAILY SUN</h1>
              <CloudOutlinedIcon />
            </Box>

            <Box>
              <p>Time : {time.toLocaleTimeString()}</p>
            </Box>
          </Box>
        </Box>


          <Box className={styles.newsSection}>
            <Box className={styles.postedNews}>
              <Box className={styles.header}>
                <p>
                  Our website has a responsive design, making it easy to read on
                  mobile devices. We offer quality reporting throughout the day.
                </p>
              </Box>

              <Box className={styles.news}>
                {newsData.map((news) => {
                  return (
                    <Link href={"/NewsDetail/" + news.id}>
                    <Box className={styles.card} key={news.id}>
                      <Box className={styles.leftinnerCard}>
                        <p
                          style={{
                            fontWeight: "bold",
                            marginLeft: "5px",
                            marginTop: "10px",
                          }}
                        >
                          {news.title}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "10px",
                            justifyContent: "space-evenly",
                            width: "140px",
                            marginBottom: "10px",
                          }}
                        >
                          {" "}
                          <AccessTimeIcon fontSize="small" /> {news.date}
                        </p>
                      </Box>
                      <Box className={styles.rightinnerCard}>
                        <img
                          src={news.imgSrc}
                          style={{ width: "150px", height: "150px" }}
                        />
                      </Box>
                    </Box>
                    </Link>
                  );
                })}
              </Box>
            </Box>

            <Box className={styles.suggestedNews}>
              <Box className={styles.sideCard}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    MOST READ
                  </h1>
                </Box>

                <Box>
                  <h1
                    style={{
                      fontWeight: "lighter",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "grey" }}>1</span>{" "}
                    : 'Are those our councillors walking out?' ANC rebels turn
                    on Lesufi's EFF deal
                  </h1>
                </Box>

                <Box>
                  <h1
                    style={{
                      fontWeight: "lighter",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "grey" }}>2</span>{" "}
                    : WRAP | Thabo Bester escape: Accused's bail application
                    postponed to 11 May
                  </h1>
                </Box>

                <Box>
                  <h1
                    style={{
                      fontWeight: "lighter",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "grey" }}>3</span>{" "}
                    : Parliament fines 'Gupta Minister' Zwane 5 days' pay, bars
                    him from debate for full term
                  </h1>
                </Box>

                <Box>
                  <h1
                    style={{
                      fontWeight: "lighter",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "grey" }}>4</span>{" "}
                    : The Guptas win – for now – on the 'unacceptably cheap'
                    R20m sale of a seized Cape Town mansion
                  </h1>
                </Box>

                <Box>
                  <h1
                    style={{
                      fontWeight: "lighter",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "grey" }}>5</span>{" "}
                    : Bester advocate withdraws because of 'funding' after being
                    asked about his own criminal trials
                  </h1>
                </Box>
              </Box>

              <Box className={styles.sideCard}
                sx={{ marginTop: "10px", background: "black", color: "white" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    News Letters
                  </h1>
                </Box>

                <Box
                  sx={{
                    fontSize: "13px",
                    fontWeight: "lighter",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <p>Top News - weekly</p>
                </Box>

                <Box>
                  <img
                    src="https://cdn.24.co.za/files/Cms/General/d/9374/2e9d19003dd14aa1be704b3ef6cd7ea3.jpg"
                    style={{
                      width: "320px",
                      height: "270px",
                      marginTop: "10px",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <NewspaperIcon fontSize={"large"} />
                  <p style={{ fontSize: "11px", marginLeft: "5px" }}>
                    A newsletter dedicated to the best conversations and
                    comments on GateWays News.
                  </p>
                </Box>
              </Box>

              <Box
                className={styles.sideCard}
                sx={{
                  marginTop: "10px",
                  background: "#f8da17",
                  height: "170px !important",
                  paddingTop: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn.24.co.za/files/Cms/General/d/10123/02b7ad0b29a24e679b19ba70ebbf12bd.png"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <p style={{ fontWeight: "bold" }}>Get the latest numbers.</p>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    marginTop: "40px",
                    background: "black",
                    color: "white",
                    height: "30px",
                    cursor: "pointer",
                    width: "200px",
                    marginLeft:"45px",
                  }}
                >
                  <button>Full list of lottery results</button>
                </Box>
              </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsBanner;
