import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

function List({ notes, notepopup, collection }) {
    // console.log(notes, collection);
    return (
        <Droppable droppableId={collection}>
            {(provided) => (
                <div
                    className="list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    id={collection}
                >
                    {notes.map((note, index) => {
                        if (note.column === collection) {
                            return (
                                <Draggable
                                    draggableId={note.id ? note.id : "tempid"}
                                    index={index}
                                    key={index}
                                >
                                    {(provided) => (
                                        <div
                                            onClick={notepopup}
                                            key={index}
                                            className="note"
                                            name={index}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h2
                                                name={index}
                                                className={`notetitle ${
                                                    note.title && "notetitlepresent "
                                                }`}
                                            >
                                                {note.title}
                                            </h2>
                                            <div name={index} className="notedescription">
                                                {note.description}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        }
                        return "";
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default List;
