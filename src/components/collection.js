import React, { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";
import { collection, addDoc, onSnapshot, doc, query, deleteDoc, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Newnote from "./newnote";

function Notes({ path, result, newNote, setResult, setNewNote }) {
    //hide or show nee note section
    const [shownote, setShowNote] = useState(false);
    const [notes, setNotes] = useState([]);
    //used to see if modal is open or not
    const [status, setStatus] = useState({ status: false, index: -1 });
    //database reference
    const colRef = collection(db, path);

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

    useEffect(() => {
        if (result) {
            const { destination, source, draggableId } = result;
            if (newNote) {
                if (newNote.title.length > 1) {
                    console.log("here");
                    console.log(source, destination, newNote);
                    if (path === destination.droppableId) {
                        setNotes([...notes, newNote]);
                        setResult("");
                        setTimeout(() => {
                            addDoc(colRef, newNote).then(() => {
                                setNewNote("");
                            });
                        }, 1000);
                    }
                    if (path === source.droppableId) {
                        console.log("deleting");
                        setNotes(notes.filter((note) => note.id !== draggableId));
                        setResult("");
                        const userDoc = doc(db, path, draggableId);
                        setTimeout(() => {
                            deleteDoc(userDoc, newNote);
                        }, 1000);
                    }
                }
            }
        }
    }, [result, path, newNote, colRef, setResult, setNewNote, notes]);

    const notepopup = (e) => {
        const ind = e.target.getAttribute("name");
        setStatus({ status: true, index: ind });
    };

    return (
        <div className="notes">
            <div className="sectionheading">{path}</div>
            <button
                className="shownewnote"
                onClick={(e) => {
                    e.preventDefault();
                    setShowNote(!shownote);
                }}
            >
                +
            </button>
            {shownote && (
                <Newnote notes={notes} setNotes={setNotes} path={path} setShowNote={setShowNote} />
            )}
            <List notes={notes} notepopup={notepopup} collection={path}></List>
            {status.status && (
                <Modal
                    closeModal={() => setStatus({ ...status, status: false })}
                    notes={notes}
                    setNotes={setNotes}
                    status={status}
                    db={db}
                    collection={path}
                ></Modal>
            )}
        </div>
    );
}

export default Notes;
