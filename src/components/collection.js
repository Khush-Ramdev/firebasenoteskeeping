import React, { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import Newnote from "./newnote";

function Notes({ path, results, db }) {
    //hide or show nee note section
    const [shownote, setShowNote] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    //used to see if modal is open or not
    const [status, setStatus] = useState({ status: false, index: -1 });

    const text = useSelector((state) => state.searchText);
    // console.log(text);
    //database reference

    useEffect(() => {
        setNotes(results);
        setFilteredNotes(results);
    }, [results]);

    useEffect(() => {
        // console.log("notes:", notes);
        // console.log("filterednotes", filteredNotes);
    }, [notes, filteredNotes]);

    const notepopup = (e) => {
        const ind = e.target.getAttribute("name");
        setStatus({ status: true, index: ind });
    };

    useEffect(() => {
        if (text) {
            setFilteredNotes(notes.filter((note) => note.title.toLowerCase().includes(text)));
        } else {
            setFilteredNotes(notes);
        }
    }, [text, notes]);

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
            <List notes={filteredNotes} notepopup={notepopup} collection={path}></List>
            {status.status && (
                <Modal
                    closeModal={() => setStatus({ ...status, status: false })}
                    notes={filteredNotes}
                    setNotes={setNotes}
                    status={status}
                    collection={path}
                    db={db}
                ></Modal>
            )}
        </div>
    );
}

export default Notes;
