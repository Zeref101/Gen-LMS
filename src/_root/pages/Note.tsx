import { useEffect, useState } from 'react';
import { fetchUserNotes } from '@/lib/backend/User';
import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Note = () => {
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

        setNoteKeys([Array.from(newKeys)]);
    }, [notes]);

    return (
        <>
            <div className=' flex h-screen flex-col gap-8 justify-start items-center w-full p-4 bg-white'>
                <h1 className='font-bold text-purple-500'>Student Notes</h1>
                <div className=' flex flex-wrap gap-4 w-[800px] justify-start items-start'>
                    {noteKeys && noteKeys.length > 0 && noteKeys[0].map((note, index) => (
                        <Link to={`/notes/${note}`} key={index}>
                            <div className="card drop-shadow-lg">
                                <div className="tools">
                                    <div className="circle">
                                        <span className="red box"></span>
                                    </div>
                                    <div className="circle">
                                        <span className="yellow box"></span>
                                    </div>
                                    <div className="circle">
                                        <span className="green box"></span>
                                    </div>
                                </div>
                                <div className=" text-white font-bold flex justify-center items-center text-[28px]">
                                    {note}
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </>
    );
};
export default Note;
