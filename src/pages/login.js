import React, { useState } from "react";
import styles from "../styles/signUp.module.css";
import { signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  TextField,
} from "@mui/material";
import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";


const login = () => {
  const googleLogo = "https://www.jigsawplanet.com/John1333/Google-G-Logo-svg?rc=face";
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = () => {
    setLoader(true);
    if (!values.email || !values.password || !values.email.includes("@")) {
      setErrorMsg("All fields to be field in !");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        // console.log(user)
        await updateProfile(user, {
          displayName: values.name,
        });
        router.push("/");
        setLoader(false);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setLoader(false);

      });
  };

  const provider = new GoogleAuthProvider();
  const loginInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        router.push("/");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false)
      });
  };

  return (
    <Box className={styles.overLay}>
      <Box className={styles.mainContainer}>
        <Box className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.innerBox}>
            <h1 className={styles.heading}>LOGIN</h1>

            <Box className={styles.inputContainer}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <TextField
                  variant="outlined"
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  className={styles.input}
                  size="small"
                  type="email"
                  name="email"
                  placeholder="enter your email"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <TextField
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  size="small"
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="enter you password"
                />
              </FormControl>
            </Box>

            <Box className={styles.footer}>
              <p style={{ color: "red" }}>{errorMsg}</p>
              <Button
               style={{ borderRadius: "5px", background:"black", color:" hsl(0, 0%, 93%)", width:"80px",height:"30px" }}
                className={styles.signupButton}
                disabled={submitButtonDisabled}
                onClick={handleSubmit}
              >
                {loader ? <MoonLoader size={20} color={color} /> : "Login"}
              </Button>
            </Box>
          </form>

          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>OR</p>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                background: "black",
                width: "200px",
                color: "white",
                height:"35px",
                borderRadius: "5px",
                paddingLeft:"20px",
                textTransform:"uppercase",
                display:"flex",
                alignItems:"center",
                justifyContent:"space-evenly",
              }}
              onClick={loginInWithGoogle}
            >
              <img src={googleLogo} style={{ width:"20px", height:"20px"}}/>
             <p style={{ fontSize:"12px", fontWeight:"bold"}}> login with google</p>
            </button>
          </Box>

          <Box className={styles.login}>
            <Link href="/signup">
              <p>
                Dont have an account?
                <span style={{ paddingLeft: "5px", color: "blue" }}>
                  Signup
                </span>
              </p>
            </Link>
          </Box>
          <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Link href="/forgotPassword">
            <p style={{color:"blue", textDecoration:"underline"}}>Forgot Password?</p>
            </Link>
          </Box>


        </Box>
      </Box>
    </Box>
  );
};

export default login;
