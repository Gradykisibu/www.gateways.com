// import React, { useState, useEffect, useContext } from "react";
// import { Box } from "@mui/material";
// import { getAuth } from "firebase/auth";
// import { useTheme } from "../context/ThemeContext";
// import { AuthContext } from "../context/AuthContext";


// const UserInfor = () => {
//   const auth = getAuth();
//   const { user} = useContext(AuthContext);
//    const darkTheme = useTheme();

//    console.log(user.metadata)


  
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "70vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           background: darkTheme ? "#000" : "#fff",
//           color: darkTheme ? "#fff" : "#000",
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             mb: "30px",
//             fontSize: "20px",
//           }}
//         >
//           USER INFORMATION
//         </Box>

//         <Box>
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "25px",
//             }}
//           >
//             <h1>CREDENTIALS</h1>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//             }}
//           >
//             <p style={{ fontWeight: "bold" }}>User:</p>
//             <p style={{ marginLeft: "5px" }}>{user.email}</p>
//           </Box>
//         </Box>

//         <Box sx={{ padding: "10px" }}>
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "25px",
//             }}
//           >
//             <h1>CREATION</h1>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//             }}
//           >
//             <p style={{ fontWeight: "bold" }}>Last SignedIn :</p>
//             {/* <p style={{ marginLeft: "5px" }}>{user.metadata.lastSignInTime}</p> */}
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               mt: "8px",
//             }}
//           >
//             <p style={{ fontWeight: "bold" }}>Profile Creation :</p>
//             <p style={{ marginLeft: "5px" }}>{user.metadata.creationTime}</p>
//           </Box>
//         </Box>

//         <Box>
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "25px",
//             }}
//           >
//             <h1>USER ID</h1>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//             }}
//           >
//             <p style={{ fontWeight: "bold" }}>Uid :</p>
//             <p style={{ marginLeft: "5px" }}>{user.uid}</p>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default UserInfor;
