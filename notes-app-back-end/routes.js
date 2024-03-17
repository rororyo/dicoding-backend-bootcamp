import {getAllNotes, getNoteById, addNote, editNote, deleteNote} from "./handler.js"



const routes = [
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotes,
        
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteById,
    },
    {
        method: "POST",
        path: "/notes",
        handler: addNote,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNote,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNote,
    },
];

export default routes;
