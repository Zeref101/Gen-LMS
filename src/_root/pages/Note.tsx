import { useEffect, useState } from 'react';
import { fetchUserNotes } from '@/lib/backend/User';
import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';



const Note = () => {
    // const user = localStorage.getItem("user");


    const userId = "default_userid";
    const [notes, setNotes] = useState<DocumentData[]>([]);
    const [noteKeys, setNoteKeys] = useState<string[][]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await fetchUserNotes(userId);
                if (fetchedNotes) {
                    setNotes([fetchedNotes]);
                } else {
                    console.log('No notes fetched');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchNotes();
    }, [userId]);
    useEffect(() => {
        const newKeys = new Set<string>();

        notes.forEach((note) => {
            Object.keys(note).forEach((key) => {
                newKeys.add(key);
            });
        });

        setNoteKeys([Array.from(newKeys)]); // Simplified to a single, flat array
    }, [notes]);

    return (
        <div className=' flex flex-col gap-8 justify-start'>
            <h1>Notes</h1>
            <div className=' flex flex-wrap gap-4 justify-center items-center'>
                {/* Ensure noteKeys is not undefined and has length before mapping */}
                {noteKeys && noteKeys.length > 0 && noteKeys[0].map((note, index) => (
                    <Link to={`/notes/${note}`} key={index}>
                        <div className=' w-40 h-40 rounded-lg bg-slate-300 hover:bg-slate-400 flex justify-center items-center'>
                            <p>{note}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Note;
