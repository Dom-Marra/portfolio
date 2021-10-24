import React, { createRef, useRef, useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from "gatsby";
import Project from '../components/project';
import { CSSTransition } from 'react-transition-group';
import useOnScreen from "../hooks/useOnScreen";

const ProjectsPage = ({ data }) => {
    const ANIMATION_TIME = 500;
    const projects = data.allWpProject.nodes;

    const titleRef = useRef();
    const titleInScreen = useOnScreen([titleRef]);
    const [titleDone, setTitleDone] = useState(ANIMATION_TIME);

    const projectRefs = useRef(projects.map(() => createRef()));
    const projectssInScreen = useOnScreen(projectRefs.current);
    const [projectsDone, setProjectsDone] = useState(projects.map((_proj, i) => i !== 0 ? 0 : ANIMATION_TIME))

    return (
        <Layout>
            <SEO 
                title="Projects"
                description="View all of my projects!"
            />

            <section className="projects-section">
                <CSSTransition in={titleInScreen[0]} timeout={0} onEntered={() => setTitleDone(0)}>
                    <h1 ref={titleRef}>Projects</h1>
                </CSSTransition>

                {projects.map((project, i) => {

                let timeOut = titleDone;
                
                for (let j = 0; j < i; j++ ) {
                    timeOut += projectsDone[j];
                }
                
                return (
                    <CSSTransition 
                        in={projectssInScreen[i]} 
                        onEntered={() => setProjectsDone([...projectsDone.splice(0, i), 0, ...projectsDone.splice(i + 1)])}
                        timeout={timeOut}
                        key={project.slug}
                    >
                        <Project ref={projectRefs.current[i]} project={project} />
                    </CSSTransition>
                )})}

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