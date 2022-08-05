import React, { useEffect, useState, useRef } from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { UserAuth } from "./AuthContext";

const Modal = ({ closeModal, notes, status, setNotes, db, collection }) => {
    const { user } = UserAuth();
    const [note, setNote] = useState({
        title: "",
        description: "",
        user: "",
        id: "",
    });

    const [Loading, setLoading] = useState(true);
    const [undo, setUndo] = useState(false);
    const undoRef = useRef(undo);

    useEffect(() => {
        if (!Loading) {
            update();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Loading]);

    useEffect(() => {
        setNote({
            ...note,
            title: notes[status.index].title,
            description: notes[status.index].description,
            user: notes[status.index].user,
            id: notes[status.index].id,
        });
        document.addEventListener("keydown", escapeModal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reset = () => {
        setNote({ title: "", description: "", user: "", id: "" });
    };

    const handleNoteChange = (e) => {
        e.preventDefault();
        const { value, id } = e.target;
        if (id === "title1") {
            setNote({ ...note, title: value, user: user.displayName });
        } else if (id === "description1") {
            setNote({ ...note, description: value, user: user.displayName });
            e.target.style.height = "inherit";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const update = async () => {
        const userDoc = doc(db, "todo", note.id);
        setLoading(true);
        await updateDoc(userDoc, note);
    };

    const updateNote = (e) => {
        if (typeof e !== "undefined") {
            e.preventDefault();
        }
        if (note.description !== "") {
            update();
            reset();
            closeModal();
        } else {
            document.querySelector(".errormodal").classList.toggle("hiddenmodal");
            setTimeout(() => {
                document.querySelector(".errormodal").classList.toggle("hiddenmodal");
            }, 1000);
        }
    };

    const deleteNote = async (e) => {
        const userDoc = doc(db, "todo", note.id);
        reset();
        closeModal();
        setUndo(false);
        await deleteDoc(userDoc, note);
    };

    useEffect(() => {
        undoRef.current = undo;
    }, [undo]);

    const handleDelete = (e) => {
        e.preventDefault();
        setUndo(true);
        setTimeout(() => {
            if (undoRef.current) {
                deleteNote();
            } else {
                setUndo(false);
            }
        }, 2500);
    };

    const escapeModal = (e) => {
        if (e.key === "Escape") {
            console.log("closed");
            closeModal();
        }
    };

    const closeicon = () => (
        <div className="cross" name="times" onClick={closeModal}>
            X
        </div>
    );

    return (
        <div className="overlay">
            <form className="content">
                {!!note.description.length && closeicon()}
                <input onChange={handleNoteChange} value={note.title} id="title1"></input>
                <div className="created">
                    <div className="width">Edited by:</div>
                    <div>{note.user}</div>
                </div>

                <div className="descriptiondiv">
                    <div className="width">Description:</div>
                    <textarea
                        onChange={handleNoteChange}
                        value={note.description}
                        id="description1"
                    ></textarea>
                </div>
                <div className="modalbuttons">
                    <button type="submit" onClick={updateNote} className="update">
                        Update
                    </button>
                    {!undo ? (
                        <button type="submit" onClick={handleDelete} className="delete">
                            Delete
                        </button>
                    ) : (
                        <button className="undo" onClick={() => setUndo(false)}>
                            Undo
                        </button>
                    )}
                </div>
                <div className="errormodal hiddenmodal">Description cannot be empty</div>
            </form>
        </div>
    );
};

export default Modal;
