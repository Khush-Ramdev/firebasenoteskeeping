import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Collection from "./collection";
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";

function Projects() {
    const { user } = UserAuth();
    const [notes, setNotes] = useState([]);
    const [id, setId] = useState();
    const [destinationid, setDestinationId] = useState();

    // const colRef = collection(db, "todo");
    const colRef = collection(db, `todo/${user.uid}/notes`);


    useEffect(() => {
        // console.log(notes);
    }, [notes]);

    useEffect(() => {

        // console.log(id);
        if (id) {
            //const updateDocId = doc(db, "todo", id);
            const updateDocId = doc(colRef, id);

            console.log(updateDocId);
            updateDoc(updateDocId, {
                column: destinationid,
            });
        }

    }, [id, destinationid, colRef]);

    useEffect(() => {
        const firstBatch = query(colRef, orderBy("timeStamp"));
        var unsubscribe = onSnapshot(
            firstBatch,
            // { includeMetadataChanges: true },
            (fetchednotes) => {
                // console.log(user);
                console.log(fetchednotes);
                if (typeof (fetchednotes.docs) !== 'undefined') {
                    setNotes(fetchednotes.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                }
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
                            setDestinationId(destination.droppableId);
                            note.column = destination.droppableId;
                        }
                        return note;
                    }),
                ])
                // console.log(id);
                // const updateDocId = doc(db, "todo", id);
                // console.log(updateDocId);
                // updateDoc(updateDocId, {
                //     column: destination.droppableId,
                // });
            }
        }
    };

    return (
        <div className="projects">
            <div className="projectGrid">
                <div className="projectsheading">Projects</div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Collection path={"todo"} results={notes} db={db} />
                    <Collection path={"progress"} results={notes} db={db} />
                    <Collection path={"completed"} results={notes} db={db} />
                </DragDropContext>
            </div>
        </div>
    );
}

export default Projects;
