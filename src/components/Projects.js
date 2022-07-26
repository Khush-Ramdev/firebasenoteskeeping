import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Collection from "./collection";
function Projects() {
    const handleDragEnd = (result) => {
        console.log(result);
    };

    return (
        <div className="projects">
            <div className="projectsheading">Projects</div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="projectGrid">
                    <Collection path={"todo"} />
                    <Collection path={"progress"} />
                    <Collection path={"completed"} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default Projects;
