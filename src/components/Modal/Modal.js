import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import styles from "../../styles/reserveModal.module.css";
import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { setReservationData } = React.useContext(AuthContext);
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    checkInTime: "",
    checkOutTime: "",
    CheckInDate: "",
    CheckOutDate: "",
    rooms: "",
    adults: "",
    children: "",
    hotel: props.hotel,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      reservation.name &&
      reservation.email &&
      reservation.rooms <= 5 &&
      reservation.adults <= 6 &&
      reservation.children <= 5
    ) {
      setReservationData(reservation);
      router.push("/bookingConfirmed");
    } else {
      console.log("please fill input");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Book Now</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        padding={"10px"}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ background: "black", color: "white", padding: "10px" }}
            >
              Booking For {props.hotel}
            </Typography>

            <Box className={styles.container}>
              <form onSubmit={handleSubmit} className={styles.innerBox}>
                <h1 className={styles.heading}>RESERVATION</h1>

                <Box className={styles.inputContainer}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <TextField
                      size="small"
                      className={styles.input}
                      type="name"
                      placeholder="Enter your name"
                      onChange={(e) => {
                        setReservation((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <TextField
                      variant="outlined"
                      className={styles.input}
                      size="small"
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      onChange={(e) => {
                        setReservation((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />
                  </FormControl>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <FormControl>
                      <FormLabel>CheckIn - Time</FormLabel>
                      <TextField
                        size="small"
                        className={styles.input}
                        type="time"
                        name="time"
                        onChange={(e) => {
                          setReservation((prev) => ({
                            ...prev,
                            checkInTime: e.target.value,
                          }));
                        }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>CheckOut - Time</FormLabel>
                      <TextField
                        size="small"
                        className={styles.input}
                        type="time"
                        name="time"
                        onChange={(e) => {
                          setReservation((prev) => ({
                            ...prev,
                            checkOutTime: e.target.value,
                          }));
                        }}
                      />
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <FormControl>
                      <FormLabel>CheckIn - Date</FormLabel>
                      <TextField
                        size="small"
                        className={styles.input}
                        type="date"
                        name="date"
                        onChange={(e) => {
                          setReservation((prev) => ({
                            ...prev,
                            CheckInDate: e.target.value,
                          }));
                        }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>CheckOut - Date</FormLabel>
                      <TextField
                        size="small"
                        className={styles.input}
                        type="date"
                        name="date"
                        onChange={(e) => {
                          setReservation((prev) => ({
                            ...prev,
                            CheckOutDate: e.target.value,
                          }));
                        }}
                      />
                    </FormControl>
                  </Box>

                  <FormControl>
                    <FormLabel>Rooms : max - 5</FormLabel>
                    <TextField
                      size="small"
                      className={styles.input}
                      type="number"
                      name="quantity"
                      min="1"
                      max="5"
                      placeholder="Enter number of rooms"
                      onChange={(e) => {
                        setReservation((prev) => ({
                          ...prev,
                          rooms: e.target.value,
                        }));
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Adults : max - 6</FormLabel>
                    <TextField
                      size="small"
                      className={styles.input}
                      type="number"
                      name="quantity"
                      min="1"
                      max="5"
                      placeholder="Enter number of adults"
                      onChange={(e) => {
                        setReservation((prev) => ({
                          ...prev,
                          adults: e.target.value,
                        }));
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Children : max - 5</FormLabel>
                    <TextField
                      size="small"
                      className={styles.input}
                      type="number"
                      name="quantity"
                      min="1"
                      max="5"
                      placeholder="Enter number of children"
                      onChange={(e) => {
                        setReservation((prev) => ({
                          ...prev,
                          children: e.target.value,
                        }));
                      }}
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <Box className={styles.footer}>
                      <button
                        style={{
                          borderRadius: "5px",
                          background: "Red",
                          color: " hsl(0, 0%, 93%)",
                          width: "80px",
                          height: "30px",
                        }}
                        className={styles.signupButton}
                        onClick={(e) => handleClose(e.preventDefault())}
                      >
                        Exit
                      </button>
                    </Box>
                    <Box className={styles.footer}>
                      <button
                        style={{
                          borderRadius: "5px",
                          background: "black",
                          color: " hsl(0, 0%, 93%)",
                          width: "80px",
                          height: "30px",
                        }}
                        className={styles.signupButton}
                        type="submit"
                        disabled={
                          (reservation.rooms > 6 &&
                            reservation.adults > 7 &&
                            reservation.children > 6) ||
                          !reservation.email ||
                          !reservation.name
                        }
                      >
                        {loading ? (
                          <MoonLoader style={{ fontSize: "small" }} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </Box>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
