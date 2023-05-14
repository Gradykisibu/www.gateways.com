import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/signUp.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
  const [passwordReset, setPasswordReset] = React.useState({
    email: "",
  });
  const [open, setOpen] = React.useState(false);
  const [emailMessage, setEmailMessage] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");


  const handleNotify = () => {
    toast.success("Reset link has been sent to your email", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }

  const handleWarning = () => {
    toast.warning("Input should not be empty", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }


  const handleResetPassWord = () => {
    // const auth = getAuth();
    sendPasswordResetEmail(auth, passwordReset.email)
      .then(() => {
        // Password reset email sent!
        // ..
        handleNotify();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleSubmit = () => {
    if (!passwordReset.email || !passwordReset.email.includes("@")) {
      handleWarning();
      return;
    } else {
      handleResetPassWord();
    }
  };

  return (
    <Box className={styles.overLay}>
      <Box className={styles.mainContainer}>
        <Box className={styles.Resetcontainer}>
          <form onSubmit={handleSubmit} className={styles.ResetinnerBox}>
            <h1 className={styles.heading}>Password Reset</h1>

            <Box className={styles.ResetinputContainer}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <TextField
                  variant="outlined"
                  onChange={(e) => {
                    setPasswordReset((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  className={styles.input}
                  size="small"
                  type="email"
                  name="email"
                  placeholder="enter your email"
                />
              </FormControl>
            </Box>

            <Box className={styles.Resetfooter}>
              <p style={{ color: "green" }}>{successMsg}</p>
              <p style={{ color: "red" }}>{errorMsg}</p>
              <ToastContainer style={{ marginTop:"60px"}}/>
              <Button
                style={{
                  borderRadius: "5px",
                  background: "black",
                  color: " hsl(0, 0%, 93%)",
                  width: "120px",
                  height: "30px",
                }}
                onClick={handleSubmit}
              >
                Submit Email
              </Button>
            </Box>
          </form>
          <Box className={styles.GotoLogin}>
            <Link href="/login">
            <p
              style={{
                textDecoration:"underline"
              }}
            >
              RETURN TO LOGIN ?
            </p>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
