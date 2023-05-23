import React from 'react'

function About() {
    return (
      <div className="about">
        <div className="aboutBackground"></div>
        <div className="aboutBottom">
          <h1> About Lifetrack</h1>
        <div className="aboutContent">
             Whether you're a college grad on the job hunt or a high school grad looking to apply for colleges, Lifetrack is the right fit for you! It doesn't matter where you are in your journey, Lifetrack can help get you there!
          </div>
          <div className="aboutHeader2">
            <h1> How It Works </h1>
          </div>
          <desc>
            Once you've made an account with us and logged in, you have access to a personal dashboard where you can start creating goals and tracking your progress. Goals are whatever you want them to be! Goals made with Lifetrack give you the ability to create titles, store important contact information and edit steps to achieving your goal. You can even sort through your goals by status to see how on task you are with all that you're out to accomplish. 
          </desc>
        </div>
      </div>
    );
}

export default About;