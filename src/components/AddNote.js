import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext , useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})
    
    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:""})
        props.showAlert('Added Successfully', 'success')
    }

    const onchange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onchange} value={note.title} className="form-control" id="title" name='title' minLength={5} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onchange} value={note.description} className="form-control" id="description" name='description' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={onchange} value={note.tag} className="form-control" id="tag" name='tag' minLength={5} required />
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
