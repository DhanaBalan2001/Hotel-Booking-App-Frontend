import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSignInAlt, faHotel, faTag, faCalendarAlt, faMapMarkerAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './register.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://hotel-booking-app-backend-8e5v.onrender.com/api';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, credentials);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register">
      <div className="rContainer">
        <div className="rcontent">
          <h1 className="rtitle"><FontAwesomeIcon icon={faHotel} /> Welcome to Hotel-Bookings</h1>
          <p className="rsubtitle">Create your account for amazing hotel experiences</p>
          <form onSubmit={handleSubmit} className="rform">
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                placeholder="Enter your username"
                id="username"
                onChange={handleChange}
                className="rinput"
                autoComplete="username"
              />
            </div>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                onChange={handleChange}
                className="rinput"
                autoComplete="email"
              />
            </div>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  className="rinput"
                  autoComplete="new-password"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <button type="submit" className="rbutton">
              <FontAwesomeIcon icon={faSignInAlt} /> Register
            </button>
            {error && <span className="error-message">{error}</span>}
          </form>
          <Link to="/login">
            <button className="rbutton">
              <FontAwesomeIcon icon={faSignInAlt} /> Already have an account? Login
            </button>
          </Link>
        </div>
        <div className="rimage">
          <img src="https://images.pexels.com/photos/96444/pexels-photo-96444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Luxury Hotel" className="himage" />
          <div className="ioverlay">
            <h2><FontAwesomeIcon icon={faHotel} /> Start Your Journey</h2>
            <ul>
              <li><FontAwesomeIcon icon={faTag} /> Access exclusive deals</li>
              <li><FontAwesomeIcon icon={faCalendarAlt} /> Manage your bookings easily</li>
              <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Personalized recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;