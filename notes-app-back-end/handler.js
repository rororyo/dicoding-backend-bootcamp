import notes from "./notes.js";
import { nanoid } from "nanoid";

// Function to get all notes
function getAllNotes(request, h) {
    try {
        return h.response({
            status: "success",
            data: {
                notes,
            },
        }).code(200);
    } catch (err) {
        // Handle errors here
    }
}

// Function to get a specific note by ID
function getNoteById(request, h) {
    try {
        const { id } = request.params;
        const note = notes.find(n => n.id === id) || {};
        return h.response({
            status: "success",
            data: { note },
        }).code(200);
    } catch (err) {
        // Handle errors here
        return h.response({
            status: "fail",
            message: "Catatan tidak ditemukan",
        }).code(404);
    }
}

// Function to add a new note
function addNote(req, h) {
    const id=nanoid(16)
    const { title, body, tags } = req.payload;
    try {
        notes.push({
            id,
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
            body,
            tags
        });
        
        return h.response({
            status: "success",
            message: "Catatan berhasil ditambahkan",
            data: {
                noteId: id,
            },
        }).code(201);
    } catch (err) {
        console.log(err)
        // Handle errors here
        return h.response({
            status: "fail",
            message: "Catatan gagal ditambahkan",
        }).code(500);
    }
}

// Function to edit a note
function editNote(req, h) {
    const { id } = req.params;
    const { title, body, tags } = req.payload;
    try {
        const index = notes.findIndex(note => note.id === id);
        if (index === -1) {
            return h.response({
                status: "fail",
                message: "Catatan tidak ditemukan",
            }).code(404);
        }
        notes[index] = {
            ...notes[index],
            title: title || notes[index].title,
            body: body || notes[index].body,
            updatedAt: new Date(),
            tags:tags||notes[index].tags
        };
        return h.response({
            status: "success",
            message: "Catatan berhasil diperbarui",
        }).code(200);
    } catch (err) {
        // Handle errors here
        return h.response({
            status: "fail",
            message: "Terjadi kesalahan dalam mengupdate catatan",
        }).code(500);
    }
}

// Function to delete a note
function deleteNote(req, h) {
    try {
        const { id } = req.params;
        const index = notes.findIndex(note => note.id === id);
        if (index === -1) {
            return h.response({
                status: "fail",
                message: "Catatan gagal dihapus. Id catatan tidak ditemukan",
            }).code(404);
        } else {
            notes.splice(index, 1);
            return h.response({
                status: "success",
                message: "Catatan berhasil dihapus",
            }).code(200);
        }
    } catch (err) {
        // Handle errors here
        return h.response({
            status: "fail",
            message: "Catatan gagal dihapus. Terjadi kesalahan pada server",
        }).code(500);
    }
}

export { getAllNotes, getNoteById, addNote, editNote, deleteNote };