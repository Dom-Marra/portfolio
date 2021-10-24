import React from "react";
import { Link } from "gatsby";
import { Link as FLink } from "react-feather";

const Project = ({ project }, ref) => (
    <Link ref={ref} to={`/projects/${project.slug}`} className="project-tile-link">
        <figure className="project-tile">
            <div className="project-tile-image-wrapper">
                <img src={project.featuredImage.node.sourceUrl} alt={project.title} />
            </div>
            <div className="project-tile-description">
                <p>{project.title}</p>
                <p>{project.projectFields.caption}</p>
                <FLink />
            </div>
        </figure>
    </Link>
)

export default React.forwardRef(Project);