import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-wrapper d-flex justify-content-center align-items-center">
        <div className="footer_top d-flex justify-content-around align-items-center">
          <ul className="menu nav ">
            <a href="#" className="leaf">Website Policies</a>
          </ul>
          <ul className="menu nav ">
            <a href="#" className="leaf">Help</a>
          </ul>
          <ul className="menu nav ">
            <a  href="#" className="leaf">Contact us</a>
          </ul>
          <ul className="menu nav ">
            <a href="#" className="leaf">Feedback</a>
          </ul>
          <ul className="menu nav ">
            <a href=""  className="leaf final">Desclaimer</a>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-wrapper d-flex justify-content-center align-items-center mb-4 ">
        <p className="f_info mb-3"> Website Content Managed by © Content Owned by Tech Yantra</p>
        <p className="f_info"> Commission, Gujarat, India.</p>
      </div>
    </footer>
  );
};

export default Footer;
