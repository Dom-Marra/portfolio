import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, Link } from "gatsby";


const ProjectsPage = ({ data }) => {
    const projects = data.allWpProject.nodes;
    return (
        <Layout>
            <SEO 
                title="Projects"
                description="View all of my projects!"
            />

            <section className="projects-section">
                <h1>Projects</h1>

                {projects.map(project => (

                    <Link to={project.slug} key={project.slug} className="project-tile-link">
                        <figure className="project-tile">
                            <div className="project-tile-image-wrapper">
                                <img src={project.featuredImage.node.sourceUrl} alt={`Image of ${project.title}`} />
                            </div>
                            <div className="project-tile-description">
                                <p>{project.title}</p>
                                <p>{project.projectFields.caption}</p>
                            </div>
                        </figure>
                    </Link>

                ))}

            </section>
        </Layout>
    )
}

export default ProjectsPage;

export const projectsQuery = graphql`
    query Projects {
        allWpProject {
            nodes {
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
    }
`;