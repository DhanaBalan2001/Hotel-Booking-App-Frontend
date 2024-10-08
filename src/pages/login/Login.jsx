import React, { useContext, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import './login.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faSignInAlt, faUserPlus, faConciergeBell, faGift, faMedal, faHotel, faStar, faCalendarAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://hotel-booking-app-backend-8e5v.onrender.com/api';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const [showPassword, setShowPassword] = useState(false);
    // eslint-disable-next-line
    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "An error occurred" });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <div className="lcontainer">
                <div className="lcontent">
                    <h1 className="ltitle"><FontAwesomeIcon icon={faHotel} /> Welcome to Hotel-Bookings</h1>
                    <p className="lsubtitle"><FontAwesomeIcon icon={faStar} /> Your gateway to luxurious hotel experiences</p>
                    <form className="lform" onSubmit={handleSubmit}>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                placeholder='Enter your username'
                                id='username'
                                onChange={handleChange}
                                className='linput'
                                autoComplete="username"
                            />
                        </div>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                id='password'
                                onChange={handleChange}
                                className='linput'
                                autoComplete="current-password"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className='lbutton'
                        >
                            {loading ? 'Logging in...' : <><FontAwesomeIcon icon={faSignInAlt} /> Login</>}
                        </button>
                        {error && <span className="error-message">{error.message}</span>}
                    </form>
                    <Link to="/register">
                        <button className='lbutton'><FontAwesomeIcon icon={faUserPlus} /> New User? Sign Up</button>
                    </Link>
                </div>
                <div className="limage">
                    <img src="https://images.pexels.com/photos/783682/pexels-photo-783682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1https://images.pexels.com/photos/783682/pexels-photo-783682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Luxury Hotel" className="himage" />
                    <div className="ioverlay">
                        <h2><FontAwesomeIcon icon={faCalendarAlt} /> Discover Your Perfect Stay</h2>
                        <ul>
                            <li><FontAwesomeIcon icon={faMedal} /> Exclusive deals on luxury hotels</li>
                            <li><FontAwesomeIcon icon={faConciergeBell} /> 24/7 concierge service</li>
                            <li><FontAwesomeIcon icon={faGift} /> Earn rewards with every booking</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;