import React from 'react';
import '../styles/Navbar.css';

function Navbar({ scrollToSection }) {
    return (
        <div className="nav-wrapper">
            <div className="container">
                <div className="nav">
                    <a href="/" className="logo">
                        <i className="fa fa-popcorn"></i>
                        Pop<span className="main-color">Corn</span>Path
                    </a>

                    {/* Navigation Links */}
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li onClick={() => scrollToSection(homeRef)}>Home</li>
                            <li onClick={() => scrollToSection(reviewsRef)}>Movies</li>
                            <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
                            <li onClick={() => scrollToSection(usersRef)}>Admin</li>
                            <li onClick={() => scrollToSection(watchlistRef)}>Watchlist</li>
                            <li onClick={() => scrollToSection(footerRef)}>Footer</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
