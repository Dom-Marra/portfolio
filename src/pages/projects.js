import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from "gatsby";
import Project from '../components/project';

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

                    <Project key={project.slug} project={project} />

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