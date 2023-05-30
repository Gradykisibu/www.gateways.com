import React from "react";
import { getAuth,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "@/Firebase/firebase";

const DeleteAccount = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [ authenticatedUser, setAuthenticatedUser ] = React.useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (email == user.email) {
      user.delete().then(
        function () {
          handlesuccess();
          router.push("/signup");
        },
        function (error) {
          console.log(error);
        }
        );
      } else {
        handleWarning();
    }
  };

  const provider = new GoogleAuthProvider();
  const loginInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        alert("User has reAuthenticated")
        console.log(user);
        setAuthenticatedUser(true);
      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });
  };

  const handleWarning = () => {
    toast.warning("Email address was incorrect please check spelling", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }
  const handlesuccess = () => {
    toast.success("User was deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer style={{ marginTop:"50px"}}/>
      
      <Box
        sx={{
          background:"white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          pt: "20px",
        }}
      >
        { authenticatedUser ? (
        <form onSubmit={handleDeleteAccount}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <input
              type="email"
              placeholder="Enter Email..."
              value={email}
              required
              onChange={handleChange}
              style={{
                width: "130%",
                border: "none",
                paddingLeft: "10px",
                height: "40px",
                paddingTop: "10px",
                border:"1px solid black",
              }}
            />

            <Box
              sx={{
                background: "#000",
                color: "white",
                width: "190px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "10px",
              }}
            >
              <button type="submit">Delete account</button>
            </Box>
          </Box>
        </form>
        )
      :
      (

        <Box
              sx={{
                background: "#000",
                color: "white",
                fontWeight: "bold",
                width: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "10px",
              }}
            >
              <button onClick={loginInWithGoogle}>REAUTHENTICATE</button>
            </Box>
      )}



        <Box
          sx={{
            marginTop: "40px",
            width: "60%",
            display: "flex",
            justifyContent: "center",
            height: "50%",
            fontWeight: "light",
            flexWrap: "wrap",
            textTransform:"uppercase"
          }}
        >
          Dear user please note that when you delete your account, all your
          progress will be lost and please reauthenticate yourself before deleting your account
        </Box>
      </Box>
    </Box>
  );
};

export default DeleteAccount;
