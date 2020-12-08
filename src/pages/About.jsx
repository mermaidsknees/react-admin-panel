import React from 'react'

// CSS
import '../About.css'

function About() {
    return (
        <div className='about-page'>
            <h1>About Page</h1>
            <div className='content'>
                <p>This is a small project made usign ReactJS that walks through Reacts basic functionality.</p>

                <h2>
                    Technologies and Features used:
                </h2>
                <ul>
                    <li>ReactJS, HTML, CSS, Javascript</li>
                    <li>React Router</li>
                    <li>Conditional and Repetitive Rendering</li>
                    <li>Lifecycle Methods</li>
                    <li>Props, State, Passing Data between components</li>
                </ul>
            </div>
        </div>
    )
}


export default About