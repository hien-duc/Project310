import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"; // Import MUI icons
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="#" className="social-icon">
            <Facebook />
          </a>
          <a href="#" className="social-icon">
            <Twitter />
          </a>
          <a href="#" className="social-icon">
            <Instagram />
          </a>
          <a href="#" className="social-icon">
            <LinkedIn />
          </a>
        </div>
        <div className="footer-links">
          <div className="page-links">
            <a href="#">Home</a>
            <a href="#">Contact</a>
            <a href="#">About Us</a>
            <a href="#">Book Categories</a>
          </div>
        </div>
      </div>
      <p>&copy; 2024 Book Club</p>
    </footer>
  );
};

export default Footer;
