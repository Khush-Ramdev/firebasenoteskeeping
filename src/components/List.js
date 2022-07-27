import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

function List({ notes, notepopup, collection }) {
    return (
        <Droppable droppableId={collection}>
            {(provided) => (
                <div
                    className="list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    id={collection}
                >
                    {provided.placeholder}
                    {notes.map((note, index) => {
                        return (
                            <Draggable draggableId={note.id} index={index} key={index}>
                                {(provided) => (
                                    <div
                                        onClick={notepopup}
                                        key={index}
                                        className="note"
                                        name={index}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
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
                    })}
                </div>
            )}
        </Droppable>
    );
}

export default List;
