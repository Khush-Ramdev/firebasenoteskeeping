import React, { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";

import Newnote from "./newnote";

function Notes({ path, results, db }) {
    //hide or show nee note section
    const [shownote, setShowNote] = useState(false);
    const [notes, setNotes] = useState([]);
    //used to see if modal is open or not
    const [status, setStatus] = useState({ status: false, index: -1 });
    //database reference
    useEffect(() => {
        setNotes(results);
    }, [notes, setNotes, results]);

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
                    collection={path}
                    db={db}
                ></Modal>
            )}
        </div>
    );
}

export default Notes;
