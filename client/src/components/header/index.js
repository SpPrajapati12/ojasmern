import logo from "../../assets/image.png";
import "./header.css";

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="ml-5 mr-5 header">
        <nav>
          <div className="d-flex justify-content-between align-items-center mt-4 mb-4 logo">
            <img src={logo} alt="img" />
            <div className="header_content">
              <p className="header_C">હેલ્પલાઇન નંબર : 1800 1234 56789</p>
              <Link to={"/signin"} >
                <button className="btn btn-success p-0 mr-3"> Login</button>
              </Link>
              <Link to={"/signup"} ><button className="btn btn-primary p-0">Register</button></Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
