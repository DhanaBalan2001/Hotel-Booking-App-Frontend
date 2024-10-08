import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faStar,
  faWifi,
  faParking,
  faSwimmingPool,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState, useCallback } from "react";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
// eslint-disable-next-line
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = useCallback((date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
    // eslint-disable-next-line
  }, []);

  const [days, setDays] = useState(1);

  useEffect(() => {
    if (dates[0]?.endDate && dates[0]?.startDate) {
      const calculatedDays = dayDifference(dates[0].endDate, dates[0].startDate);
      setDays(calculatedDays);
    } else {
      // Try to get dates from localStorage if not available in context
      const storedDates = JSON.parse(localStorage.getItem('searchDates'));
      if (storedDates && storedDates[0]?.endDate && storedDates[0]?.startDate) {
        const calculatedDays = dayDifference(new Date(storedDates[0].endDate), new Date(storedDates[0].startDate));
        setDays(calculatedDays);
      }
    }
  }, [dates, dayDifference]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setRating(data.rating);
    }
  }, [data]);
  
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const amenities = [
    { icon: faWifi, name: "Free WiFi" },
    { icon: faParking, name: "Parking" },
    { icon: faSwimmingPool, name: "Swimming Pool" },
    { icon: faUtensils, name: "Restaurant" },
  ];

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <div className="reservationPlaceholder">Reservation options coming soon!</div>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelRating">
              <span>Ratings: </span>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  />
                );
              })}
              <span> {rating}</span>
            </div>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * (options.room || 1)}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
            <div className="hotelAmenities">
              <h2>Amenities</h2>
              <div className="amenitiesList">
                {amenities.map((amenity, index) => (
                  <div key={index} className="amenityItem">
                    <FontAwesomeIcon icon={amenity.icon} />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;