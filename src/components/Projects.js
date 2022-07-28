import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Collection from "./collection";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Projects() {
    const [result, setResult] = useState("");
    const [newNote, setNewNote] = useState("");
    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (destination) {
            console.log(result);
            if (source.droppableId !== destination.droppableId) {
                console.log(source.droppableId, draggableId);
                const docRef = doc(db, source.droppableId, draggableId);
                getDoc(docRef)
                    .then((docSnap) => {
                        console.log(docSnap.data());
                        setNewNote(docSnap.data());
                    })
                    .catch((e) => {
                        console.log(e.message);
                    });
                setResult(result);
            }
        }
    };

    return (
        <div className="projects">
            <div className="projectsheading">Projects</div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="projectGrid">
                    <Collection
                        path={"todo"}
                        result={result}
                        newNote={newNote}
                        setNewNote={setNewNote}
                        setResult={setResult}
                    />
                    <Collection
                        path={"progress"}
                        result={result}
                        newNote={newNote}
                        setNewNote={setNewNote}
                        setResult={setResult}
                    />
                    <Collection
                        path={"completed"}
                        result={result}
                        newNote={newNote}
                        setNewNote={setNewNote}
                        setResult={setResult}
                    />
                </div>
            </DragDropContext>
        </div>
    );
}

export default Projects;
