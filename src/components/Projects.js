import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Collection from "./collection";
import { collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Projects() {
    const [note, setNote] = useState();
    const [destination, setDestination] = useState();
    const [source, setSource] = useState();
    const [draggableId, setDraggableId] = useState();

    const handleDragEnd = async (result) => {
        console.log(result);
        const { destination, source, draggableId } = result;
        if (destination) {
            if (source.droppableId !== destination.droppableId) {
                setDestination(destination);
                setSource(source);
                setDraggableId(draggableId);
                console.log(source.droppableId, draggableId, destination.droppableId);
                const docRef = doc(db, `${source.droppableId}`, `${draggableId}`);
                await getDoc(docRef)
                    .then((docSnap) => {
                        console.log("Document data:", docSnap.data());
                        setNote(docSnap.data());
                    })
                    .catch((e) => {
                        console.log(e.message);
                    });
            }
        }
    };

    useEffect(() => {
        if (note) {
            const colRef = collection(db, destination.droppableId);
            const docRef = doc(db, source.droppableId, draggableId);
            deleteDoc(docRef, note).then(() => {
                addDoc(colRef, note);
            });
            setNote("");
        }
    }, [note, destination, source, draggableId]);

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
