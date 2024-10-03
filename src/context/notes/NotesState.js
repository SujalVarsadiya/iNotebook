import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        try {
            const url = `${host}/api/notes/fetchallnotes`;

            // Use `fetch` to make the request
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });

            // Check if the response is OK before parsing JSON
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Await and parse JSON response
            const json = await response.json();

            // Log and set the notes state
            setNotes(json);

        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };


    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json()
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        try {
            // API CALL
            const url = `${host}/api/notes/deletenote/${id}`
            // Use `fetch` to make the request
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });

            // Check if the response is OK before parsing JSON
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Await and parse JSON response
            const json = await response.json();
            console.log(json)

            // Logic a delete
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        try {
            // API Call
            const url = `${host}/api/notes/updatenote/${id}`
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag }),
            });

            // Check if the response is OK before parsing JSON
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }


            const json = await response.json()
            console.log(json)

            // Logic to edit
            let newNotes = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index]
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            setNotes(newNotes)
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState;