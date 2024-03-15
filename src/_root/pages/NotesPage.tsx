// import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const NotesPage = () => {
    const { noteID } = useParams();

    return (
        <div>
            <h1>Note ID: {noteID}</h1>
        </div>
    )
}

export default NotesPage
