import "./navbar.css"
import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
          <span className="logo">
            <FontAwesomeIcon icon={faHotel} /> Hotel-Bookings
          </span>
        </Link>
        <div className="navItems">
          {user ? (
            <>
              <span className="username">
                <FontAwesomeIcon icon={faUser} /> {user.username}
              </span>
              <button className="navButton" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navButton-login">
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </button>
              </Link>
              <Link to="/register">
                <button className="navButton-signup">
                  <FontAwesomeIcon icon={faUserPlus} /> Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar