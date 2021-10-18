import React from "react"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"


const AboutMe = ({ data }) => {
    return (
        <Layout>
            <Seo 
                title="About Me"
            />
            <section className="about-me-section">
                <h1>About Me</h1>
                <p>{data.wpPage.aboutMeFields.description}</p>
                <img 
                    className="profile-pic"
                    src={data.wpPage.aboutMeFields.image.sourceUrl} 
                    alt={data.wpPage.aboutMeFields.image.altText} 
                />
                <div className="skills-container">
                    <h2>Skills</h2>
                    {
                        data.wpPage.aboutMeFields.skills.map(skill => (
                            <div className="skill-bar">
                                <p>{skill.skill.skillName}</p>
                                <p>{skill.skill.skillPercent}%</p>
                                <div class="progress-bar-background">
                                    <div className="progress-bar" style={{width: skill.skill.skillPercent + '%'}}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
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
                skills {
                    skill {
                        skillName
                        skillPercent
                    }
                }
            }
        }
    }
`

