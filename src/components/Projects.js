import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Collection from "./collection";
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Projects() {
    const [notes, setNotes] = useState([]);
    const [id, setId] = useState();
    const colRef = collection(db, "todo");

    useEffect(() => {
        // console.log(notes);
    }, [notes]);

    useEffect(() => {
        const firstBatch = query(colRef, orderBy("timeStamp"));
        var unsubscribe = onSnapshot(
            firstBatch,
            // { includeMetadataChanges: true },
            (fetchednotes) => {
                setNotes(fetchednotes.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            },
            (error) => {
                console.log(error);
            },
        );
        return function cleanup() {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (destination) {
            // console.log(result);
            if (source.droppableId !== destination.droppableId) {
                // console.log(source.droppableId, draggableId);
                setNotes([
                    ...notes.filter((note) => {
                        if (note.id === draggableId) {
                            setId(note.id);
                            note.column = destination.droppableId;
                        }
                        return note;
                    }),
                ]);
                console.log(id);
                const updateDocId = doc(db, "todo", id);
                console.log(updateDocId);
                updateDoc(updateDocId, {
                    column: destination.droppableId,
                });
            }
        }
    };

    return (
        <div className="projects">
            <div className="projectsheading">Projects</div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="projectGrid">
                    <Collection path={"todo"} results={notes} db={db} />
                    <Collection path={"progress"} results={notes} db={db} />
                    <Collection path={"completed"} results={notes} db={db} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default Projects;
