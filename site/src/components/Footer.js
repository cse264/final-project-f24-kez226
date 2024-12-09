import React from 'react';
//import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="footer-content">
                            <a href="#" className="logo">
                                <i className="bx bx-movie-play bx-tada main-color"></i>
                                Pop<span className="main-color">Corn</span>Path
                            </a>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam ex quos hic id
                                nobis beatae earum sapiente!
                            </p>
                            <div className="social-list">
                                <a href="#" className="social-item"><i className="bx bxl-facebook"></i></a>
                                <a href="#" className="social-item"><i className="bx bxl-twitter"></i></a>
                                <a href="#" className="social-item"><i className="bx bxl-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-3">
                                <h3>Flix</h3>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">My Profile</a></li>
                                    <li><a href="#">Pricing Plans</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3>Browse</h3>
                                <ul>
                                    <li><a href="#">Movies</a></li>
                                    <li><a href="#">Series</a></li>
                                    <li><a href="#">Genres</a></li>
                                    <li><a href="#">Top Picks</a></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3>Help</h3>
                                <ul>
                                    <li><a href="#">FAQs</a></li>
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Terms</a></li>
                                    <li><a href="#">Privacy</a></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3>Download App</h3>
                                <ul>
                                    <li><a href="#"><img src="./images/google-play.png" alt="Google Play" /></a></li>
                                    <li><a href="#"><img src="./images/app-store.png" alt="App Store" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright 2023 © Flix</p>
            </div>
        </footer>
    );
}

export default Footer;
