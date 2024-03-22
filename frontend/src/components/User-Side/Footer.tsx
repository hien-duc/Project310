import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"; // Import MUI icons
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.facebook.com/" className="social-icon">
            <Facebook />
          </a>
          <a href="https://twitter.com" className="social-icon">
            <Twitter />
          </a>
          <a href="https://www.instagram.com/" className="social-icon">
            <Instagram />
          </a>
          <a href="https://www.linkedin.com/" className="social-icon">
            <LinkedIn />
          </a>
        </div>
        <div className="footer-links">
          <div className="page-links">
            <a href="/homePage">Home</a>
            <a href="#">Contact</a>
            <a href="#">About Us</a>
            <a href="/bookCategory">Book Categories</a>
          </div>
        </div>
      </div>
      <div className="footer-content">
        <p>Copyright &copy; 2024 Book Club Inc. All rights reserved</p>
        <p> Privacy Policy | Terms of Use | Sales Policy | Legal | Site Map</p>
      </div>
    </footer>
  );
};

export default Footer;
