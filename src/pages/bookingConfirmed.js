import React from "react";
import { Box } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { AuthContext } from "@/components/context/AuthContext";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useRouter } from "next/router";


const bookingConfirmed = () => {
  const { reservationData } = React.useContext(AuthContext);
  const [redirecting, setRedirecting] = React.useState(false);

  const router = useRouter();
  console.log(reservationData);

  const handleBooking = () =>{
    router.push('/')
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding:"50px"
      }}
    >
      <Box>
        <h1>BOOKING SUCCESSFULLY MADE</h1>
      </Box>

      <Box>
        <CheckCircleOutlineOutlinedIcon
          sx={{ color: "green", fontSize: "70px" }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mt:"30px",
        }}
      >
        <Box
          sx={{
            width: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background: "black",
          }}
        >
          <h2>Booking Details</h2>
        </Box>

        <Box sx={{mt:"20px", height:"300px", display:"flex", justifyContent:"space-evenly", flexDirection:"column", width:"100%"}}>
          <p><PermIdentityOutlinedIcon/> Name : {reservationData.name}</p>
          <p><EmailOutlinedIcon/> Email: {reservationData.email} </p>
          <p><AccessTimeIcon/> Checkin - Checkout Times: {reservationData.checkInTime} - {reservationData.checkOutTime}</p>
          <p><EventAvailableOutlinedIcon/> Checkin - Checkout Dates : {reservationData.CheckInDate} - {reservationData.CheckOutDate}</p>
          <p><LocalHotelOutlinedIcon/> Rooms :  {reservationData.rooms}</p>
          <p><GroupAddOutlinedIcon/> Adults :  {reservationData.adults}</p>
          <p><FamilyRestroomOutlinedIcon/> Children :  {reservationData.children}</p>
        </Box>
      </Box>

      <Box
          sx={{
            width: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background: "black",
            borderRadius:"5px"
          }}
          onClick={handleBooking}
        >
          <p>DONE</p>
        </Box>
    </Box>
  );
};

export default bookingConfirmed;
