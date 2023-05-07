import React, { useState } from "react";
import styles from "../styles/signUp.module.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";

const signup = () => {
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
    if (!values.name || !values.email) {
      setErrorMsg("All fields to be field in !");
      setLoader(false);
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        router.push("/");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
    setLoader(false);
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        router.push("/");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={styles.overLay}>
      <Box className={styles.mainContainer}>
        <Box className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.innerBox}>
            <h1 className={styles.heading}>SIGNUP</h1>

            <Box className={styles.inputContainer}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <TextField
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  size="small"
                  className={styles.input}
                  type="name"
                  placeholder="enter your name"
                />
              </FormControl>

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
              <button
                style={{ borderRadius: "5px" }}
                className={styles.signupButton}
                disabled={submitButtonDisabled}
                onClick={handleSubmit}
              >
                {loader ? <MoonLoader size={20} color={color} /> : "Sign up"}
              </button>
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
                background: "red",
                width: "200px",
                color: "white",
                borderRadius: "5px",
              }}
              onClick={signInWithGoogle}
            >
              Google
            </button>
          </Box>

          <Box className={styles.login}>
            <Link href="/login">
              <p>
                Already have an account?
                <span style={{ paddingLeft: "5px", color: "blue" }}>Login</span>
              </p>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default signup;
