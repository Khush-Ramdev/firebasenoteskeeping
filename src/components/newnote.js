import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";

function Newnote({ notes, setNotes, path, setShowNote }) {
    const { user } = UserAuth();

    //used for setting note description height as dynamic
    const descriptionref = useRef(null);
    const colRef = collection(db, "todo");

    useEffect(() => {
        if (descriptionref.current) {
            descriptionref.current.style.minHeight = "2rem";
        }
    }, []);

    const [note, setNote] = useState({
        title: "",
        description: "",
        user: "",
        id: "",
        column: path,
    });

    const reset = () => {
        setNote({ title: "", description: "", user: "", id: "", column: "" });
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
            const updateDocId = doc(db, "todo", added.id);
            await updateDoc(updateDocId, {
                id: added.id,
                user: user.displayName,
                timeStamp: Date.now(),
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

    return (
        <div className="newnotewrapper">
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
    );
}

export default Newnote;
