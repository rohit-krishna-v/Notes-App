import { useEffect, useState } from "react"
import Note from "../components/note"
import api from "../api"
import "../styles/Home.css"

function Home () {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()},[])

    const getNotes = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data)
        console.log(data)})
        .catch((error) => alert(error))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then( (res) => {
            if (res.status === 204) alert("Note deleted!")
            else alert("Failed to delete notes.")
        getNotes()
        })
        .catch((error) => alert(error))
       
    }

    const createNotes = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title})
        .then((res) => {
            if (res.status === 201) alert("Noter created!")
            else alert("Failed to create note.")
        getNotes()
        })
        .catch((error) => alert(error))
        
    }

    return <div>
        <div>
            <h2>Notes</h2>
        </div>
        <h2>Create a Note</h2>
        {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
        <form onSubmit={createNotes}>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text" name="title" id="title" required onChange={ (e) => setTitle(e.target.value)} value={title} />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea name="content" id="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
}

export default Home