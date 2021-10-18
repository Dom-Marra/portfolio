import React from "react"
import Layout from "../components/layout";
import { GitHub, Linkedin } from 'react-feather';
import Seo from "../components/seo";

const HomePage = () => {
    
    return (
        <Layout>
            <Seo 
                title="Home"
                description="Hi, I'm Dominic Marra a front-end web developer. Come check out my portfolio!"
            />
            <section className="home-page-section">
                <div className="home-content-wrapper">
                    <h1>Dominic <span className="s-text-color">Marra</span></h1>
                    <p><span className="s-text-color">Front-End</span> Web Developer<span className="s-text-color">.</span></p>
                    <div className="links-container">
                        <a 
                            href="https://github.com/Dom-Marra" 
                            rel="noreferrer"
                            target="_blank"
                            className="dm-btn"
                        >
                            <GitHub />
                            &nbsp;
                            GitHub
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/dominic-marra-131700191/" 
                            rel="noreferrer"
                            target="_blank"
                            className="dm-btn"
                        >
                            <Linkedin />
                            &nbsp;
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default HomePage;