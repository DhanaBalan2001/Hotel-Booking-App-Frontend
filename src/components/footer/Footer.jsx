import "./footer.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHotel, 
  faBed, 
  faConciergeBell, 
  faPlane, 
  faCar, 
  faUtensils, 
  faInfoCircle, 
  faUserShield,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="fLists">
          <ul className="fList">
            <li className="fListItem"><FontAwesomeIcon icon={faHotel} /> Our Services</li>
            <li className="fListItem"><FontAwesomeIcon icon={faBed} /> Accommodations</li>
            <li className="fListItem"><FontAwesomeIcon icon={faConciergeBell} /> Concierge</li>
            <li className="fListItem"><FontAwesomeIcon icon={faPlane} /> Travel Arrangements</li>
            <li className="fListItem"><FontAwesomeIcon icon={faCar} /> Transportation</li>
            <li className="fListItem"><FontAwesomeIcon icon={faUtensils} /> Dining</li>
          </ul>
          <ul className="fList">
            <li className="fListItem">About Us</li>
            <li className="fListItem">Careers</li>
            <li className="fListItem">Press Center</li>
            <li className="fListItem">Investor Relations</li>
            <li className="fListItem">Terms & Conditions</li>
          </ul>
          <ul className="fList">
            <li className="fListItem"><FontAwesomeIcon icon={faInfoCircle} /> Customer Support</li>
            <li className="fListItem"><FontAwesomeIcon icon={faUserShield} /> Privacy Policy</li>
            <li className="fListItem"><FontAwesomeIcon icon={faEnvelope} /> contact@hotelbooking.com</li>
            <li className="fListItem"><FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567</li>
            <li className="fListItem"><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Booking Street, City, Country</li>
          </ul>
        </div>
        <div className="social-media">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#!" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#!" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#!" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#!" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        </div>
      </div>
      <div className="fText">
        <p>© 2024 Hotel-Bookings. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;