import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { addDoc, collection, query , serverTimestamp, orderBy} from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import SendIcon from "@mui/icons-material/Send";
import { onSnapshot } from "firebase/firestore";

const Comments = () => {
  const [user, setUser] = useState();
  const [values, setValues] = useState({
    comment: "",
  });
  const [saveComment, setSaveComment] = useState([]);
  const [commentData, setCommentData] = useState([]);


  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data.displayName);
    });
  }, []);


  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("postedAt"));
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

    await addDoc(collection(db, "comments"), {
      user,
      comment: values.comment,
      postedAt: serverTimestamp()
    });

    setSaveComment(values);
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
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          flexWrap: "wrap",
          width: "80%",
          height: "auto",
          fontWeight: "light",
          textTransform: "capitalize",
          padding: "10px",
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
          background: "#000",
          borderRadius: "10px",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            width:"100%"
          }}>
            <input
              type="text"
              placeholder="Comments..."
              style={{
                width: "100%",
                height: "40px",
                paddingLeft: "5px",
                paddingTop: "7px",
                borderRadius: "10px",
              }}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, comment: e.target.value }));
              }}
            />
            <button
              style={{
                color: "black",
                background: "white",
                width: "80px",
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                  background: "white",
                  mt: "10px",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <p>Comment From: </p>
                  <p style={{ marginLeft: "10px", fontWeight: "bold", textTransform:"capitalize"}}>
                    {data.user}
                  </p>
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
                      background: "grey",
                      color: "white",
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
