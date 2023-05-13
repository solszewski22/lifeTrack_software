import React from 'react'
import { Link } from 'react-router-dom'

function Navbar (props) {
    let link = "/login";
    let homeLink = "/";
    if(props.status === "Logout"){
        link = "/"
        homeLink = "#"
    }

    function onChange() {
        props.set("Login");
    }

    return (
        <nav className="nav navbar">
            <Link to={homeLink} className="site-title">LifeTrack</Link>
            <ul>
                <li>
                    <Link to={link} onClick={onChange}>{props.status}</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;