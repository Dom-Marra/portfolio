import React, { useRef, useState, useEffect } from 'react';

import Layout from '../components/layout';
import { graphql } from "gatsby";
import parse from 'html-react-parser';

import { GitHub, Link } from 'react-feather';
import Seo from '../components/seo';
import Project from '../components/project';
import TechIcons from '../components/techIcons';

import { CSSTransition } from 'react-transition-group';
import useOnScreen from "../hooks/useOnScreen";

const ProjectTemplate = ({ data }) => {

    const PROJECT_DESC = data.project.projectFields.overview.replaceAll(/<\/?p>/ig, '\n');

    const [imageLoaded, setImageLoaded] = useState(false);

    const titleRef = useRef();
    const titleInScreen = useOnScreen([titleRef], '0px', imageLoaded);

    const mockupRef = useRef();
    const mockupInScreen = useOnScreen([mockupRef], '0px', imageLoaded);

    const overviewRef = useRef();
    const overviewInScreen = useOnScreen([overviewRef], '-25px', imageLoaded);

    const featureRef = useRef();
    const featureInScreen = useOnScreen([featureRef], '-25px', imageLoaded);

    const techStackRef = useRef();
    const techStackInScreen = useOnScreen([techStackRef], '-25px', imageLoaded);

    const projectsTitleRef = useRef();
    const projectsTtitleInScreen = useOnScreen([projectsTitleRef], '0px', imageLoaded);

    const projectPreviousRef = useRef();
    const projectPreviousInScreen = useOnScreen([projectPreviousRef], '0px', imageLoaded);

    const projectNextRef = useRef();
    const projectNextInScreen = useOnScreen([projectNextRef], '0px', imageLoaded);


    useEffect(() => {
        const desktopImagePreload = new Image();
        desktopImagePreload.src = data.project.projectFields.mockUpImage.sourceUrl;
        desktopImagePreload.onload = () => dataLoaded();

        const tabletImagePreload = new Image();
        tabletImagePreload.src = data.project.projectFields.mockUpImageTablet.sourceUrl;
        tabletImagePreload.onload = () => dataLoaded();

        const mobileImagePreload = new Image();
        mobileImagePreload.src = data.project.projectFields.mockUpImageMobile.sourceUrl;
        mobileImagePreload.onload = () => dataLoaded();

        const dataLoaded = () => {
            if (desktopImagePreload.complete && 
                tabletImagePreload.complete && 
                mobileImagePreload.complete) setImageLoaded(true);
        }
    }, []);

    return (

        <Layout>
            <Seo
                title={data.project.title}
                description={PROJECT_DESC}
            />

            {imageLoaded &&
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
                        <picture ref={mockupRef} className="mockup-image">
                            <source media="(min-width: 56em)" srcSet={data.project.projectFields.mockUpImage.srcSet} />
                            <source media="(min-width: 35em)" srcSet={data.project.projectFields.mockUpImageTablet.srcSet} />
                            <source media="(max-width: 35em)" srcSet={data.project.projectFields.mockUpImageMobile.srcSet} />
                            <img 
                                src={data.project.projectFields.mockUpImage.sourceUrl} 
                                alt={data.project.projectFields.mockUpImage.altText} 
                                srcSet={data.project.projectFields.mockUpImage.srcSet} 
                                sizes={data.project.projectFields.mockUpImage.sizes} 
                            />
                        </picture>
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
                                <Project ref={projectPreviousRef} project={data.previous} />
                            </CSSTransition>
                        }

                        {data.next &&
                            <CSSTransition in={projectNextInScreen[0]} timeout={0}>
                                <Project ref={projectNextRef} project={data.next} />
                            </CSSTransition>
                        }
                    </section>

                </article>
            }
        </Layout>
    )
}

export default ProjectTemplate;

export const projectQuery = graphql`
    query ProjectByID(
        $id: String!
        $previousProjectId: String
        $nextProjectId: String
    ) {
        project: wpProject(id: { eq: $id }) {
            projectFields {
                mockUpImage {
                    altText
                    sizes
                    srcSet
                    sourceUrl
                }
                mockUpImageTablet {
                    sourceUrl
                    srcSet
                }
                mockUpImageMobile {
                    sourceUrl
                    srcSet
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

        previous: wpProject(id: { eq: $previousProjectId }) {
            slug
            title
            featuredImage {
                node {
                    sourceUrl
                }
            }
            projectFields {
                caption
            }
        }
        
        next: wpProject(id: { eq: $nextProjectId }) {
            slug
            title
            featuredImage {
                node {
                    sourceUrl
                }
            }
            projectFields {
                caption
            }
        }
    }
`;