import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/navbar-logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/#hero" className="navbar-logo">
          <img src={logo} alt="Sudhanshu logo" />
        </a>

        <div className="navbar-links">
          <a href="/#about">About</a>
          <a href="/#experience">Experience</a>
          <a href="/#skills">Skills</a>
          <Link to="/projects">Projects</Link>
          <a href="/#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
