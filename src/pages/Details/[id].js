import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/components/context/AuthContext";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Autoplay } from "swiper";
import styles from "../../styles/main.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import TransitionsModal from "@/components/Modal/Modal";

const Details = () => {
  const { vacationData } = useContext(AuthContext);
  const [singleData, setSingleData] = useState([]);
  const router = useRouter();
  const id = router.query.id;
  const currentData = vacationData.filter((item) => item.id == id);

  const getCustomData = () => {
    setSingleData(currentData);
  };

  useEffect(() => {
    getCustomData();
  }, []);

  return (
    <Box>
      {singleData.map((Data) => {
        return (
          <Box key={Data.id}>
            <Swiper
              pagination={true}
              loop={true}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <Box sx={{ width: "100%", height: "450px" }}>
                  <img
                    src={Data.sliderImg1}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box sx={{ width: "100%", height: "450px" }}>
                  <img
                    src={Data.sliderImg2}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box sx={{ width: "100%", height: "450px" }}>
                  <img
                    src={Data.sliderImg3}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box sx={{ width: "100%", height: "450px" }}>
                  <img
                    src={Data.sliderImg4}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box sx={{ width: "100%", height: "450px" }}>
                  <img
                    src={Data.sliderImg5}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </SwiperSlide>
            </Swiper>

            <Box className={styles.destTitleContainer}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#000",
                  height: "60px",
                  flexDirection: "column",
                  width: "80%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  <h1>{Data.destTitle}</h1>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%",
                    fontSize: "12px",
                  }}
                >
                  <LocationOnOutlinedIcon fontSize="small" />
                  <p>{Data.location}</p>
                </Box>
              </Box>
            </Box>

            <Box className={styles.viewsContainer}>
              <Box className={styles.viewsInnerContainer}>
                {/* Hotels Views */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    <h3>Hotel Views</h3>
                  </Box>

                  <Box>
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarHalfIcon fontSize="small" />
                  </Box>
                </Box>

                {/* Contact Numbers */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    <h3>Contact number</h3>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocalPhoneIcon fontSize="small" />
                    <p style={{ fontWeight: "light", marginLeft: "5px" }}>
                      +27 64 374 3385
                    </p>
                  </Box>
                </Box>

                {/* Email address */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    <h3>Email Address</h3>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmailIcon fontSize="small" />
                    <p style={{ fontWeight: "light", marginLeft: "5px" }}>
                      Kisibugrady3980@gmail.com
                    </p>
                  </Box>
                </Box>

                {/* Country */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    <h3>Country</h3>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PublicIcon fontSize="small" />
                    <p style={{ fontWeight: "light", marginLeft: "5px" }}>
                      {Data.location}
                    </p>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ background: "#000", color: "white" }}>
              <Box className={styles.descriptionContainer}>
                <Box className={styles.descriptionTitle}>
                  <h1>About</h1>
                </Box>

                <Box className={styles.descriptionInnerContainer}>
                  <Box className={styles.descriptionData}>
                    <p>{Data.description}</p>

                    <Box sx={{ display: "flex", marginTop: "20px" }}>
                      <Box sx={{ fontWeight: "bold", fontSize: "50px" }}>
                        <h1>4,5</h1>
                      </Box>

                      <Box
                        sx={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          ml: "6px",
                        }}
                      >
                        <p>Excellent</p>
                        <Box>
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarHalfIcon fontSize="small" />
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ mt: "10px" }}>
                      <p style={{ fontSize: "12px" }}>
                        Experimental Reviews...
                      </p>
                      <Box sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarHalfIcon fontSize="small" />
                          <p style={{ fontSize: "13px" }}>Service</p>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarHalfIcon fontSize="small" />
                          <p style={{ fontSize: "13px" }}>Cleanliness</p>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarHalfIcon fontSize="small" />
                          <p style={{ fontSize: "13px" }}>Location</p>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarIcon fontSize="small" />
                          <StarHalfIcon fontSize="small" />
                          <p style={{ fontSize: "13px" }}>Value</p>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ mt: "20px", flexDirection: "column" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <PsychologyAltIcon />
                        <p style={{ fontWeight: "bold" }}>Traveller's Choice</p>
                      </Box>

                      <Box>
                        <span style={{ fontWeight: "500", marginTop: "5px" }}>
                          What is Travellers’ Choice?
                        </span>
                        <p style={{ marginTop: "5px" }}>
                          Gateways gives a Travellers’ Choice award to
                          accommodations, attractions and restaurants that
                          consistently earn great reviews from travellers and
                          are ranked within the top 10% of properties on
                          Gateways.
                        </p>
                      </Box>
                    </Box>
                  </Box>

                  <Box className={styles.subject}>
                    {/* Properies */}
                    <Box>
                      <h1 style={{ fontWeight: "500" }}>Property amenities</h1>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        <Box>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>{" "}
                            Free Parking
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Pool
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Bar / Lounge
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Bycicle Rental
                          </p>
                        </Box>

                        <Box>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Free Wifi
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Beach
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Baby Sitting
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Workout Room
                          </p>
                        </Box>
                      </Box>
                    </Box>

                    {/* Room features */}
                    <Box sx={{ mt: "20px" }}>
                      <h1 style={{ fontWeight: "500" }}>Room features</h1>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        <Box>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>{" "}
                            Blackout curtains
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Air conditioning
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Desk
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Cable / satellite TV
                          </p>
                        </Box>

                        <Box>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Bathrobes
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Private Beach
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Minibar
                          </p>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Walk in shower
                          </p>
                        </Box>
                      </Box>
                    </Box>

                    {/* Room types */}
                    <Box sx={{ mt: "20px" }}>
                      <h1 style={{ fontWeight: "500" }}>Room types</h1>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        <Box>
                          <p>
                            {" "}
                            <span>
                              <VerifiedIcon fontSize="small" />
                            </span>
                            Ocean view
                          </p>
                          <p>
                            {" "}
                            <span>
                              <CancelIcon fontSize="small" />
                            </span>
                            Non-smoking rooms
                          </p>
                          <p>
                            {" "}
                            <span>
                              <CancelIcon fontSize="small" />
                            </span>
                            Family rooms
                          </p>
                        </Box>

                        <Box>
                          <p>
                            {" "}
                            <span>
                              <CancelIcon fontSize="small" />
                            </span>
                            Landmark view
                          </p>
                          <p>
                            {" "}
                            <span>
                              <CancelIcon fontSize="small" />
                            </span>
                            Suites
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "40%",
                    background: "white",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius:"5px"
                  }}
                >
                  <TransitionsModal hotel={Data.destTitle}/>
                </Box>
              </Box>

              {/* Location Google Map Iframe View */}
              <Box sx={{ width: "100%", padding: "10px" }}>
                <Box className={styles.descriptionTitle}>
                  <h1>Map Location</h1>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "10px",
                  }}
                >
                  <iframe
                    src={Data.mapLocation}
                    width="auto"
                    height="400"
                    style={{ border: "0" }}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Details;
