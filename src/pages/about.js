import React, { createRef, useRef } from "react"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import TechIcons from "../components/techIcons"
import parse from 'html-react-parser';
import { CSSTransition } from 'react-transition-group';
import useOnScreen from "../hooks/useOnScreen";


const AboutMe = ({ data }) => {
    const titleRef = useRef();
    const titleInScreen = useOnScreen([titleRef]);

    const descRef = useRef();
    const descInScreen = useOnScreen([descRef]);

    const imgRef = useRef();
    const imgInScreen = useOnScreen([imgRef]);

    const skillTitleRef = useRef();
    const skillTitleInScreen = useOnScreen([skillTitleRef]);

    const skillRefs = useRef(data.wpPage.aboutMeFields.skills.map(() => createRef()));
    const skillsInScreen = useOnScreen(skillRefs.current);

    return (
        <Layout>
            <Seo
                title="About Me"
            />
            <section className="about-me-section">
                <CSSTransition in={titleInScreen[0]} timeout={0}>
                    <h1 ref={titleRef}>About Me</h1>
                </CSSTransition>

                <CSSTransition in={descInScreen[0]} timeout={0}>
                    <div ref={descRef} className="description">
                        {parse(data.wpPage.aboutMeFields.description)}
                    </div>
                </CSSTransition>

                <CSSTransition in={imgInScreen[0]} timeout={0}>
                    <img 
                        className="profile-pic"
                        src={data.wpPage.aboutMeFields.image.sourceUrl} 
                        alt={data.wpPage.aboutMeFields.image.altText} 
                        ref={imgRef}
                    />
                </CSSTransition>
                
                { (<div className="skills-container">
                        <CSSTransition in={skillTitleInScreen[0]} timeout={0}>
                            <h2 ref={skillTitleRef}>Skills</h2>
                        </CSSTransition>
                        {data.wpPage.aboutMeFields.skills.map((skill, i) => {

                            return (
                                <CSSTransition in={skillsInScreen[i]} timeout={0} key={skill}>
                                    <TechIcons ref={skillRefs.current[i]} icon={skill} /> 
                                </CSSTransition>
                            )
                        })}
                    </div>)
                }
                
            </section>
        </Layout>
    )
}

export default AboutMe;

export const aboutMeQuery = graphql`
    query {
        wpPage(slug: {eq: "about-me"}) {
            aboutMeFields {
                description
                image {
                    altText
                    sizes
                    srcSet
                    sourceUrl
                }
                skills
            }
        }
    }
`

