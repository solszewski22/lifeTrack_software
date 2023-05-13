import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <img class="bg-img" src="./imgs/goal_life.jpg" alt="Bg-Img"></img>
            <div className="welcome">
                <p class="welcome-text">Let's 
                    <span> GOAL </span>
                For It!</p>
                <ul>
                    <li>
                        <Link to="/register" type="button" class="btn welcome-btn">Get Started</Link>
                    </li>
                    <li>
                        <Link to="/about" type="button" class="btn welcome-btn">Learn More</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Home;