import React from "react";
import ToDo from "./Todo";
import Progress from "./Progress";
import Completed from "./Completed";
function Projects() {
    return (
        <div className="projects">
            <div className="projectsheading">Projects</div>
            <div className="projectGrid">
                <ToDo />
                <Progress />
                <Completed />
            </div>
        </div>
    );
}

export default Projects;
