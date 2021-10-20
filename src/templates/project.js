import React from 'react';

import Layout from '../components/layout';
import { graphql } from "gatsby";
import parse from 'html-react-parser';

import { GitHub, Link } from 'react-feather';
import Seo from '../components/seo';
import Project from '../components/project';

const ProjectTemplate = ({ data }) => {
    console.log(data);
    return (
        <Layout>
            <Seo 
                title={data.project.title}
            />
            <article className="project-template">
                <header className="project-header">
                    <h1 className="project-title">{data.project.title}</h1>
                    <div className="links">
                        { data.project.projectFields.githubRepoLink &&   
                            (<a href={data.project.projectFields.githubRepoLink} 
                                rel="noreferrer"
                                target="_blank">
                                    <GitHub />
                            </a>)
                        }
                        { data.project.projectFields.liveLink &&   
                            (<a href={data.project.projectFields.liveLink} 
                                rel="noreferrer"
                                target="_blank">
                                    <Link />
                            </a>)
                        }
                    </div>
                </header>
                <img className="mockup-image" src={data.project.projectFields.mockUpImage.sourceUrl} alt="" />
                {data.project.projectFields.techStack?.length > 0 &&
                (<div className="tech-stack">
                    {data.project.projectFields.techStack.map((tech, i) => (
                        <span key={tech} className="tech">{tech}</span>
                    ))}
                </div>)}
                

                <section className="project-section">
                    <h2>Overview</h2>
                    {parse(data.project.projectFields.overview)}
                </section>

                <section className="project-section">
                    <h2>Solution</h2>
                    {parse(data.project.projectFields.solution)}
                </section>

                <section className="project-section">
                    <h2>Challenges</h2>
                    {parse(data.project.projectFields.challenges)}
                </section>

                <section className="project-section other-projects">
                    <h2>Other Projects</h2>

                    {data.next && <Project project={data.next} />}
                    {data.previous && <Project project={data.previous} />}
                </section>

            </article>
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
                challenges
                githubRepoLink
                liveLink
                mockUpImage {
                    sourceUrl
                }
                overview
                solution
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