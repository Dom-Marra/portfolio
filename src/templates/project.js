import React, { useRef, useState } from 'react';

import Layout from '../components/layout';
import { graphql } from "gatsby";
import parse from 'html-react-parser';

import { GitHub, Link } from 'react-feather';
import Seo from '../components/seo';
import Project from '../components/project';
import TechIcons from '../components/techIcons';

import { CSSTransition } from 'react-transition-group';
import useOnScreen from "../hooks/useOnScreen";

import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"

const ProjectTemplate = ({ data }) => {

    const mockUpImages = useRef(withArtDirection(getImage(data.project.projectFields.mockUpImageMobile.localFile), [
        {
            image: getImage(data.project.projectFields.mockUpImage.localFile),
            media: '(min-width: 56em)'
        },
        {
            image: getImage(data.project.projectFields.mockUpImageTablet.localFile),
            media: '(min-width: 35em)'
        },
        {
            image: getImage(data.project.projectFields.mockUpImageMobile.localFile),
            media: '(max-width: 35em)'
        },
    ]));

    const [mockUpAlt, setMockUpAlt] = useState('');

    const PROJECT_DESC = data.project.projectFields.overview.replaceAll(/<\/?p>/ig, '\n');

    const titleRef = useRef();
    const titleInScreen = useOnScreen([titleRef], '0px');

    const mockupRef = useRef();
    const mockupInScreen = useOnScreen([mockupRef], '0px');

    const overviewRef = useRef();
    const overviewInScreen = useOnScreen([overviewRef], '-25px');

    const featureRef = useRef();
    const featureInScreen = useOnScreen([featureRef], '-25px');

    const techStackRef = useRef();
    const techStackInScreen = useOnScreen([techStackRef], '-25px');

    const projectsTitleRef = useRef();
    const projectsTtitleInScreen = useOnScreen([projectsTitleRef], '0px');

    const projectPreviousRef = useRef();
    const projectPreviousInScreen = useOnScreen([projectPreviousRef], '0px');

    const projectNextRef = useRef();
    const projectNextInScreen = useOnScreen([projectNextRef], '0px');

    return (

        <Layout>
            <Seo
                title={data.project.title}
                description={PROJECT_DESC}
            />
            <article className="project-template">
                <CSSTransition in={titleInScreen[0]} timeout={0}>
                    <header ref={titleRef} className="project-header">
                        <h1 className="project-title">{data.project.title}</h1>
                        <div className="links">
                            {data.project.projectFields.githubRepoLink &&
                                (<a href={data.project.projectFields.githubRepoLink}
                                    rel="noreferrer"
                                    target="_blank">
                                    <GitHub />
                                </a>)
                            }
                            {data.project.projectFields.liveLink &&
                                (<a href={data.project.projectFields.liveLink}
                                    rel="noreferrer"
                                    target="_blank">
                                    <Link />
                                </a>)
                            }
                        </div>
                    </header>
                </CSSTransition>

                <CSSTransition in={mockupInScreen[0]} timeout={0}>
                    <div ref={mockupRef} className="mockup-image-container">
                        <GatsbyImage 
                            className="mockup-image" 
                            image={mockUpImages.current} 
                            onLoad={() => {
                                const deskMedia = window.matchMedia('(min-width: 56em)');
                                const tabmedia = window.matchMedia('(min-width: 35em)');

                                if (deskMedia.matches && data.project.projectFields.mockUpImage.altText)  {
                                    setMockUpAlt(data.project.projectFields.mockUpImage.altText);
                                } else if (tabmedia.matches && data.project.projectFields.mockUpImageTablet.altText) {
                                    setMockUpAlt(data.project.projectFields.mockUpImageTablet.altText);
                                } else if (data.project.projectFields.mockUpImageMobile.altText) {
                                    setMockUpAlt(data.project.projectFields.mockUpImageMobile.altText);
                                } else setMockUpAlt('Mock up of ' + data.project.title);
                            }} 
                            alt={mockUpAlt}
                        />
                    </div>

                </CSSTransition>

                <CSSTransition in={overviewInScreen[0]} timeout={0}>
                    <section ref={overviewRef} className="project-section">
                        <h2>Overview</h2>
                        {parse(data.project.projectFields.overview)}
                    </section>
                </CSSTransition>

                <CSSTransition in={featureInScreen[0]} timeout={0}>
                    <section ref={featureRef} className="project-section">
                        <h2>Features</h2>
                        <ul>
                            {data.project.projectFields.features.map((feature, i) => (
                                <li key={i}>{feature.feature}</li>
                            ))}
                        </ul>
                    </section>
                </CSSTransition>

                {data.project.projectFields.techStack?.length > 0 &&
                    (
                        <CSSTransition in={techStackInScreen[0]} timeout={0}>
                            <section ref={techStackRef} className="project-section">
                                <h2>Tech Stack</h2>
                                <div className="tech-stack">
                                    {data.project.projectFields.techStack.map((tech, i) => (
                                        <TechIcons key={tech} icon={tech} />
                                    ))}
                                </div>
                            </section>
                        </CSSTransition>
                    )}

                <section className="project-section other-projects">
                    <CSSTransition in={projectsTtitleInScreen[0]} timeout={0}>
                        <h2 ref={projectsTitleRef}>Other Projects</h2>
                    </CSSTransition>

                    {data.previous &&
                        <CSSTransition in={projectPreviousInScreen[0]} timeout={0}>
                            <Project ref={projectPreviousRef} project={data.previous.project} />
                        </CSSTransition>
                    }

                    {data.next &&
                        <CSSTransition in={projectNextInScreen[0]} timeout={0}>
                            <Project ref={projectNextRef} project={data.next.project} />
                        </CSSTransition>
                    }
                </section>

            </article>
        </Layout>
    )
}

export default ProjectTemplate;

export const projectQuery = graphql`
    query ProjectByID(
        $id: String!
        $previousProjectId: ID!
        $nextProjectId: ID!
    ) {
        project: wpProject(id: { eq: $id }) {
            projectFields {
                mockUpImage {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, transformOptions: {fit: CONTAIN})
                        }
                    }
                }
                mockUpImageTablet {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, transformOptions: {fit: CONTAIN})
                        }
                    }
                }
                mockUpImageMobile {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, transformOptions: {fit: CONTAIN})
                        }
                    }
                }
                features {
                    feature
                }
                githubRepoLink
                liveLink
                overview
                techStack
            }
            title
        }

        previous: portfolio {
            project(id: $previousProjectId) {
                slug
                title
                featuredImage {
                    node {
                        altText
                        sizes(size: PROJECT_TUMBMAILS)
                        srcSet
                        sourceUrl
                    }
                }
                projectFields {
                    caption
                }
            }
        }
        
        next: portfolio {
            project(id: $nextProjectId) {
                slug
                title
                featuredImage {
                    node {
                        altText
                        sizes(size: PROJECT_TUMBMAILS)
                        srcSet
                        sourceUrl
                    }
                }
                projectFields {
                    caption
                }
            }
        }
    }
`;