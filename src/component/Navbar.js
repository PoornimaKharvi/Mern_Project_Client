import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dealsImage from '../images/deals.png';

const adminNav = [
  { name: "Home", path: "/home" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Employee List", path: "/employee-list" },
  { name: "Create Employee", path: "/create-employee" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setuser] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setuser(userName)
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={dealsImage} alt="DealsDray" height="80px" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}
          style={{ display: mobileMenuOpen ? "none": "flex", flexDirection: "row", justifyContent: "space-between" }}

        >
          <ul className="navbar-nav">
            {adminNav.map((val, ind) => (
              <li key={ind} className="nav-item">
                <NavLink
                  className="nav-link"
                  to={val.path}
                  onClick={closeMobileMenu}
                >
                  {val.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <h5
              className="nav-link"
             
              onClick={closeMobileMenu} 
            >
              {user} <NavLink   to="/logout" style={{ fontStyle: "bold", color: "red", marginLeft: "15px" }}> Logout </NavLink>
            </h5>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
