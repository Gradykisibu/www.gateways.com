import React, { useState } from "react";
import styles from "../../styles/support.module.css";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { sendContactForm } from "../../../lib/supportApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = () => {
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  const [ loader, setLaoder ] = useState(false);

  const handleNotify = () => {
    toast.success("Email sent Gateways will be in touch with you", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  const handleWarning = () => {
    toast.warning("Email address was not sent", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

       setLaoder(true);
    if (values.Name && values.Email && values.Subject && values.Message) {
      await sendContactForm(values);
      handleNotify();
      setValues({
        Name: "",
        Email: "",
        Subject: "",
        Message: "",
      });
      setLaoder(false);
    } else {
      handleWarning();
      setLaoder(false);
    }
  };

  return (
    <Box className={styles.mainContainer}>
      <ToastContainer />
      <Box className={styles.innerContainer}>
        <Box className={styles.topBox}>
          <Box
            sx={{
              flexWrap: "wrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                background: "black",
                width: "70%",
                marginLeft: "10px",
              }}
            >
              <p className={styles.header}>GATEWAYS SUPPORT</p>
            </Box>

            <Box
              sx={{
                padding: "10px",
                width: "90%",
                display: "flex",
                flexWrap:"wrap"
              }}
            >
              <p style={{ fontWeight: "200" }}>
                GateWays Support Page is just one example of a modern support
                page for consumer goods. The layout is clean and easy to
                navigate, making it easy for customers to find the information
                they need.
              </p>

              <p style={{ marginTop: "5px", fontWeight: "200" }}>
                The design also makes it evident that GateWays cares about its
                customers and wants them to have an enjoyable experience. One of
                the main reasons why GateWays support page is a great example is
                the ability to search for specific products. This feature allows
                customers to easily find information about any product, making
                their lives easier. Not only does this help customers find
                answers faster, but it also prevents them from having to scroll
                through hundreds of pages looking for answers.
              </p>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button className={styles.supportBtn}>Support</button>
            </Box>
          </Box>

          <Box>
            <img
              src="/support.png"
              style={{ width: "500px", height: "300px" }}
            />
          </Box>
        </Box>

        <Box className={styles.bottomBox}>
        <Box className={styles.formHeaderContainer}>
              <h1
                className={styles.formHeader}
              >
                SUPPORT FORM
              </h1>
        </Box>
        
        <Box>
        <form onSubmit={handleSubmit} className={styles.innerBox}>

            <Box className={styles.inputContainer}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <TextField
                value={values.Name}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, Name: e.target.value }));
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
                value={values.Email}
                  variant="outlined"
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, Email: e.target.value }));
                  }}
                  className={styles.input}
                  size="small"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Subject</FormLabel>
                <TextField
                value={values.Subject}
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      Subject: e.target.value,
                    }));
                  }}
                  size="small"
                  className={styles.input}
                  type="text"
                  name="subject"
                  placeholder="Enter your password"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Message</FormLabel>
                <textarea 
                rows="4" 
                cols="50" 
                form="usrform"
                value={values.Message}
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      Message: e.target.value,
                    }));
                  }}
                  size="small"
                  className={styles.inputMessage}
                  type="text"
                  name="message"
                  placeholder="Enter your message"
                />
              </FormControl>
            </Box>

            <Box className={styles.button}>
              <button
              type="submit"
                className={styles.submitButton}
              >
                {loader ? "submitting..." : "submit"}
              </button>
            </Box>
          </form>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;
