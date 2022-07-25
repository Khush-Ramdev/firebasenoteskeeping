import React, { useEffect, useState, useRef } from "react";
import List from "./List";
import Modal from "./Modal";
import { collection, addDoc, onSnapshot, updateDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";

function Notes() {
    const { user } = UserAuth();
    const [shownote, setShowNote] = useState(false);

    //hooks
    const [note, setNote] = useState({
        title: "",
        description: "",
        user: "",
        id: "",
    });
    const [notes, setNotes] = useState([]);
    //used for setting note description height as dynamic
    const descriptionref = useRef(null);
    //used to see if modal is open or not
    const [status, setStatus] = useState({ status: false, index: -1 });
    useEffect(() => {
        console.log(notes);
    }, [notes]);
    //database reference
    const colRef = collection(db, "completed");

    useEffect(() => {
        const firstBatch = query(colRef);
        var unsubscribe = onSnapshot(
            firstBatch,
            (fetchednotes) => {
                console.log("fetch");
                console.log(fetchednotes.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setNotes(fetchednotes.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            },
            (error) => {
                console.log(error);
            },
        );

        if (descriptionref.current) {
            descriptionref.current.style.minHeight = "2rem";
        }
        //
        return function cleanup() {
            unsubscribe();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(shownote);
    }, [shownote]);

    const reset = () => {
        setNote({ title: "", description: "", user: "", id: "" });
    };

    const handleNoteChange = (e) => {
        const { value, id } = e.target;
        if (id === "title") {
            setNote({ ...note, title: value });
        } else if (id === "description") {
            setNote({ ...note, description: value });
            e.target.style.height = "inherit";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const submitNote = async (e) => {
        e.preventDefault();
        if (note.description !== "") {
            setNotes([...notes, { ...note, id: note.id }]);
            const added = await addDoc(colRef, note);
            const updateDocId = doc(db, "completed", added.id);
            await updateDoc(updateDocId, {
                id: added.id,
                user: user.email,
            });
            setShowNote(false);
            reset();
        } else {
            document.querySelector(".error").classList.toggle("hidden");
            setTimeout(() => {
                document.querySelector(".error").classList.toggle("hidden");
            }, 1000);
        }
    };

    const notepopup = (e) => {
        const ind = e.target.getAttribute("name");
        setStatus({ status: true, index: ind });
    };

    return (
        <div className="notes">
            <div className="sectionheading">To Do</div>
            <button
                className="shownewnote"
                onClick={(e) => {
                    e.preventDefault();
                    setShowNote(!shownote);
                    reset();
                }}
            >
                +
            </button>
            {shownote && (
                <div>
                    <form className="newnote">
                        <input
                            placeholder="Title"
                            onChange={handleNoteChange}
                            id="title"
                            value={note.title}
                        ></input>
                        <textarea
                            placeholder="Description"
                            onChange={handleNoteChange}
                            id="description"
                            value={note.description}
                            ref={descriptionref}
                            cols="2"
                        ></textarea>
                        <button type="submit" onClick={submitNote} id="submit">
                            Add To Do
                        </button>
                    </form>
                    <div className="error hidden">Description cannot be empty</div>
                </div>
            )}
            <List notes={notes} notepopup={notepopup}></List>
            {status.status && (
                <Modal
                    closeModal={() => setStatus({ ...status, status: false })}
                    notes={notes}
                    setNotes={setNotes}
                    status={status}
                    db={db}
                    reset={reset}
                    collection="completed"
                ></Modal>
            )}
        </div>
    );
}

export default Notes;
