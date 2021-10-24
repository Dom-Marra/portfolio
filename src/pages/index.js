import React, { useRef, useState } from "react"
import Layout from "../components/layout";
import { GitHub, Linkedin } from 'react-feather';
import Seo from "../components/seo";
import Particles from "react-tsparticles";
import { CSSTransition } from 'react-transition-group';
import useOnScreen from "../hooks/useOnScreen";

const HomePage = () => {

    const ANIMATION_TIME = 500; 

    const titleRef = useRef()
    const titleOnScreen = useOnScreen([titleRef]);
    const [titleDone, setTitleDone] = useState(ANIMATION_TIME);

    const captionRef = useRef()
    const captionScreen = useOnScreen([captionRef]);
    const [captionDone, setCaptionDone] = useState(ANIMATION_TIME);

    const linksRef = useRef()
    const linksOnScreen = useOnScreen([linksRef]);

    return (
        <Layout>
            <Seo
                title="Home"
                description="Hi, I'm Dominic Marra a front-end web developer. Come check out my portfolio!"
            />
            <section className="home-page-section">
                <Particles
                    className="particles-background"
                    options={{
                        "fps_limit":60,
                        "interactivity":{
                           "detectsOn":"canvas",
                           "events":{
                              "resize":true
                           },
                           "modes":{
                              "push":{
                                 "particles_nb":4
                              },
                              "repulse":{
                                 "distance":100,
                                 "duration": 1
                              }
                           }
                        },
                        "particles":{
                           "links":{
                              "color":"#7BD0F5",
                              "distance":150,
                              "enable":true,
                              "opacity": 0.2,
                              "width": 2
                           },
                           "move":{
                              "bounce":false,
                              "direction":"none",
                              "enable":true,
                              "outMode":"out",
                              "random":false,
                              "speed":1.5,
                              "straight":false
                           },
                           "number":{
                              "density":{
                                 "enable":true,
                                 "area":800
                              },
                              "value":90
                           },
                           "opacity":{
                              "value":0.5
                           },
                           "shape":{
                              "type":"none"
                           }
                        },
                        "detectRetina":true
                     }}
                />
                <div className="home-content-wrapper">

                    <CSSTransition in={titleOnScreen[0]} timeout={0} onEntered={() => setTitleDone(0)}> 
                        <h1 ref={titleRef} className="reveal">Dominic <span className="s-text-color">Marra</span></h1>
                    </CSSTransition>
                    <CSSTransition in={captionScreen[0]} timeout={titleDone} onEntered={() => {setCaptionDone(0)}}>
                        <p ref={captionRef} className="reveal"><span className="s-text-color">Front-End</span> Web Developer<span className="s-text-color">.</span></p>
                    </CSSTransition>
                    <CSSTransition in={linksOnScreen[0]} timeout={titleDone + captionDone}>
                        <div ref={linksRef} className="links-container reveal">
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
                    </CSSTransition>
                </div>
            </section>
        </Layout>
    )
}

export default HomePage;