import React, { useState } from "react";
import { getAuth, updatePassword , GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Box, Button, TextField } from "@mui/material";
import TransitionsModal from "../Modal/Modal";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "../context/ThemeContext";

const ChangePassword = () => {
  const auth = getAuth();
  const [ password, setPassword ] = useState("")

  // const darkTheme = useTheme()
  // const Themestyles = {
  //   backgroundColor: darkTheme ? "#000" : "#fff"
  // }

  const handleNewPassWord = (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const newPassword = password;

    if(password){
      updatePassword(user, newPassword)
        .then(() => {

          console.log("Password changed")
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log(error.message)
          // handleWarning(error);
        });
    }
  }

  const handleclick = () => {
    // const credential = promptForCredentials();
    // reauthenticateWithPopup(user, credential).then(() => {
    //   // User re-authenticated.
    // }).catch((error) => {
    //   // An error ocurred
    //   // ...
    // });
  }
  const handlesuccess = () => {
    toast.success("User was deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }

  const provider = new GoogleAuthProvider();
  const loginInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        // router.push("/settings");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <ToastContainer style={{ marginTop:"50px"}}/> */}
      <Box
        sx={{
          width: "100%",
          background: darkTheme ? "#000" : "#fff",
          color: darkTheme ? "#fff" : "#000",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
        <Box sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb:"30px",
          fontSize:"20px"
        }}>
          CHANGE PASSWORD
        </Box>


        <form style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
           flexDirection:"column"
        }}
        onSubmit={handleNewPassWord}
        >
            <Box sx={{marginBottom:"30px"}}>
              <TextField required id="outlined-required" label="New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Box>

            <Box>
              <Button type="submit" variant="outlined">Save Password</Button>
            </Box>
        </form>

        <Box>
          <Button onClick={loginInWithGoogle}>REAUTHENTICATE</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
