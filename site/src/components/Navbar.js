import React, { useRef } from 'react';
import './Navbar.css'; // Assuming you already have your styles here

function Navbar() {
    const homeRef = useRef(null);
    const reviewsRef = useRef(null);
    const watchlistRef = useRef(null);
    const usersRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="nav-wrapper">
            <div className="container">
                <div className="nav">
                    <a href="/" className="logo">
                        <i className="fa fa-popcorn"></i> {/* Optional: For an icon */}
                        Pop<span className="main-color">Corn</span>Path
                    </a>
                    
                    {/* Navigation Links */}
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li onClick={() => scrollToSection(homeRef)}>Home</li>
                            <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
                            <li onClick={() => scrollToSection(watchlistRef)}>WatchList</li>
                            <li onClick={() => scrollToSection(usersRef)}>Users</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
