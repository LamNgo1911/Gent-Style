import React from "react";
import "./Footer.scss";

import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-infor">
        <div className="footer-content">
          <div className="footer-wrapper">
            <div className="footer-subcontent">
              <h2>Explore GentStyle</h2>
              <p>Contact Info</p>
              <p>Contact Info</p>
              <p>Contact Info</p>
              <p>Contact Info</p>
              <p>Contact Info</p>
              <p>Contact Info</p>
              <p>Contact Info</p>
            </div>

            <div className="footer-subcontent">
              <h2>Customer Service</h2>
              <p>FAQs</p>
              <p>Contact Info</p>
              <p>Shipping And Returns Policy</p>
            </div>
          </div>

          <div className="footer-wrapper">
            <div className="footer-subcontent">
              <h2>About GentStyle</h2>
              <p>News</p>
              <p>Careers</p>
              <p>Investors</p>
              <p>Sustainability</p>
              <p>Purpose</p>
            </div>

            <div className="footer-subcontent">
              <h2>Join Us</h2>
              <p>GentStyle app</p>
              <p>GentStyle community</p>
              <p>GentStyle club</p>
            </div>
          </div>
        </div>

        <div className="footer-icons">
          <FaFacebookSquare />
          <FaTwitterSquare />
          <FaInstagramSquare />
          <FaYoutubeSquare />
        </div>
      </div>

      <div className="footer-policy">
        <p className="footer-policy__rights">
          © 2024 GentStyle, Inc. All Rights Reserved
        </p>
        <div className="footer-policy__content">
          <p>Guides</p>
          <p>Term of use</p>
          <p>Term of sale</p>
          <p>Company Detail </p>
          <p>Privacy & Cookie policy</p>
          <p>Cookies Settings</p>
        </div>
      </div>
    </footer>
  );
}
