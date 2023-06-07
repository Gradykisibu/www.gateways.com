import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import {
  addDoc,
  collection,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import SendIcon from "@mui/icons-material/Send";
import { onSnapshot } from "firebase/firestore";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useTheme } from "../context/ThemeContext";

const Comments = () => {
  const [user, setUser] = useState();
  const [commentValue, setCommentValue] = useState("");
  const [saveComment, setSaveComment] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [alert, setAlert] = useState(false);
  const darkTheme = useTheme();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data.email);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "comments"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ ...doc.data() });
      });
      setCommentData(commentsArray);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentValue) {
      setSaveComment(commentValue);
      setAlert(true);
      await addDoc(collection(db, "comments"), {
        user,
        comment: commentValue,
        postedAt: serverTimestamp(),
        id: crypto.randomUUID(),
      });

      setTimeout(() => {
        setAlert(false);
      }, 3000);

      setCommentValue("");
    }
  };


  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "20px",
        flexDirection: "column",
        background: darkTheme ? "black" : "ededed",
      }}
    >
      <Stack>
        {alert ? (
          <Alert variant="filled" severity="success">
            Your Comment Has Been Added
          </Alert>
        ) : (
          ""
        )}
      </Stack>
      <Box
        sx={{
          border: darkTheme ? "1px solid white" : "1px solid black",
          color:darkTheme ? "#fff" : "#000",
          flexWrap: "wrap",
          width: "80%",
          height: "auto",
          fontWeight: "light",
          textTransform: "capitalize",
          padding: "10px",
          marginTop:"10px"
        }}
      >
        <h1>
          {user} welcome to the comments section, here you will be updated with
          the latest feedbacks on vacations that people all aorund the world has
          visited, feel free to leave a comment and keep up with the current
          comments on gateWays vacations all accross the world.
        </h1>
      </Box>

      <Box
        sx={{
          width: "60%",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          background: darkTheme ? "#fff" : "#000",
          borderRadius: "10px",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Comments..."
              value={commentValue}
              style={{
                width: "100%",
                height: "40px",
                paddingLeft: "5px",
                paddingTop: "7px",
                borderRadius: "10px",
                border: darkTheme && "1px solid black",
              }}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <button
              style={{
                color:darkTheme ? "#fff" : "#000",
                background:darkTheme ? "#000" : "#fff",
                width: "120px",
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight:"bold",
              }}
              type="submit"
            >
              SEND
              <SendIcon fontSize="small" />
            </button>
          </Box>
        </form>
      </Box>

      <Box
        sx={{
          width: "80%",
        }}
      >
        {commentData.map((data, index) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  background:darkTheme ? "white" : "white",
                  mt: "10px",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      color:darkTheme && "black",
                    }}
                  >
                    <p>Comment From: </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {data.user}
                    </p>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      background:darkTheme ? "grey" : "lightgrey" ,
                      color:darkTheme && "white",
                      borderRadius: "5px",
                      marginTop: "10px",
                      padding: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <p>{data.comment}</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Comments;
