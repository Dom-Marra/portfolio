import React, { createRef, useRef } from "react"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import TechIcons from "../components/techIcons"
import parse from 'html-react-parser';
import { CSSTransition } from 'react-transition-group';
import useOnScreen from "../hooks/useOnScreen";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const AboutMe = ({ data }) => {

    const ABOUT_ME_DESC = data.wpPage.aboutMeFields.description.replaceAll(/<\/?p>/ig, '\n');

    console.log(data);

    const titleRef = useRef();
    const titleInScreen = useOnScreen([titleRef], '0px');

    const descRef = useRef();
    const descInScreen = useOnScreen([descRef], '0px');

    const imgRef = useRef();
    const imgInScreen = useOnScreen([imgRef], '0px');

    const skillTitleRef = useRef();
    const skillTitleInScreen = useOnScreen([skillTitleRef], '0px');

    const skillRefs = useRef(data.wpPage.aboutMeFields.skills.map(() => createRef()));
    const skillsInScreen = useOnScreen(skillRefs.current, '0px');

    return (
        <Layout>
            <Seo
                title="About Me"
                description={ABOUT_ME_DESC}
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
                    <div ref={imgRef} className="profile-pic">
                        <GatsbyImage 
                            className="mockup-image" 
                            image={getImage(data.wpPage.aboutMeFields.image.localFile)} 
                            alt={data.wpPage.aboutMeFields.image.altText}
                        />
                    </div>
                </CSSTransition>

                {(<div className="skills-container">
                    <CSSTransition in={skillTitleInScreen[0]} timeout={0}>
                        <h2 ref={skillTitleRef}>Skills</h2>
                    </CSSTransition>
                    {data.wpPage.aboutMeFields.skills.map((skill, i) => (
                        <CSSTransition in={skillsInScreen[i]} timeout={0} key={skill}>
                            <TechIcons ref={skillRefs.current[i]} icon={skill} />
                        </CSSTransition>
                    ))}
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
                    localFile {
                        childImageSharp {
                            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, transformOptions: {fit: CONTAIN})
                        }
                    }
                }
                skills
            }
        }
    }
`

