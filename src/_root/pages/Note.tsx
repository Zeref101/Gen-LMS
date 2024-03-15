import { useEffect, useState } from 'react';
import { fetchUserNotes } from '@/lib/backend/User';

const Note = () => {
    // const [noteData, setNoteData] = useState(null);
    const userId = "default_userid"; // This should be dynamically set based on your application's needs

    useEffect(() => {
        try {
            const notes = fetchUserNotes(userId);
            if (notes) {
                console.log(typeof (notes));

            }

        } catch (error) {
            console.log(error);
        }

    }, [userId]); // Dependency array ensures this effect runs once upon mount or when `userId` changes

    return (
        <div>
            hi
        </div>
    );
}

export default Note;
