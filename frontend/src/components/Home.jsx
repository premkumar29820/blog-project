import React from 'react'
import BlogProfileImage from "../assets/Blog Website Design.jpg"
import CSS from "../assets/css-3.png"
import HTML from "../assets/html.png"
import DB from "../assets/data-server.png"
import JS from "../assets/js.png"
import REACTICON from "../assets/physics.png"
import NODE from "../assets/node-js.png"
import P1 from "../assets/p1.jpg"
import P2 from "../assets/p2.png"
import P3 from "../assets/p3.png"
import BlogImage from "../assets/blogImage.png"
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer'

function Home() {
    const navigate = useNavigate()
    return (
        <div className='home-page'>
            <section className='hero-section'>
                <div className="hero-copy">
                    <p className='eyebrow'>Independent developer · Available for select projects</p>
                    <h1 className='display-font'>Digital work with a <em>human</em> point of view.</h1>
                    <p className='hero-description'>I create thoughtful, high-performing websites and digital experiences for people building something worth sharing.</p>
                    <div className='hero-actions'>
                        <button className='button-style'>Hire Me <span>↗</span></button>
                        <span className='availability'><i></i> Currently taking on work</span>
                    </div>
                </div>
                <div className='hero-art'>
                    <div className='hero-image-frame'><img src={BlogProfileImage} alt="Jacky Thomas" /></div>
                    <div className='hero-note'><span>01</span><p>Ideas made<br />visible.</p></div>
                </div>
            </section>
            <div className='tool-strip'>
                <span>Working with</span><img src={HTML} alt="HTML" /><img src={CSS} alt="CSS" /><img src={JS} alt="JavaScript" /><img src={REACTICON} alt="React" /><img src={DB} alt="Database" /><img src={NODE} alt="Node.js" />
            </div>
            <section className='about-section'>
                <div className='stats-grid'>
                    <div className='stat-card'><strong>06</strong><p>Projects completed</p></div>
                    <div className='stat-card stat-card-coral'><strong>06</strong><p>Months of experience</p></div>
                </div>
                <div className='services-copy'>
                    <p className='eyebrow'>A little about my work</p>
                    <h2 className='display-font'>Small team energy.<br /><em>Big picture thinking.</em></h2>
                    <p>I bring strategy, design, and development together to make digital products that feel clear, useful, and distinctly yours.</p>
                    <button className='button-style'>Download CV <span>↓</span></button>
                </div>
            </section>
            <section className='projects-section'>
                <div className='section-heading'><div><p className='eyebrow'>Selected work</p><h2 className='display-font'>A few things I’ve<br /><em>made recently.</em></h2></div><span className='section-index'>02 / 03</span></div>
                <div className='project-grid'>
                    <img src={P1} className='project-image project-image-tall' alt="Project preview one" />
                    <img src={P2} className='project-image project-image-offset' alt="Project preview two" />
                    <img src={P3} className='project-image' alt="Project preview three" />
                </div>
            </section>
            <section className='writing-section'>
                <div className='writing-image'><img src={BlogImage} alt="A notebook and creative tools" /></div>
                <div className="writing-copy">
                    <p className='eyebrow'>From the notebook</p>
                    <h2 className='display-font'>Thoughts on tech,<br /><em>design & process.</em></h2>
                    <p>Notes, experiments, and useful things I’ve learned while making things for the web.</p>
                    <button className='button-style' onClick={() => navigate("/blogs")}>Read my blogs <span>↗</span></button>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home
