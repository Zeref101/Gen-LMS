import { useEffect, useState } from 'react';
import { fetchUserNotes } from '@/lib/backend/User';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import MarkdownNotes from '@/components/MarkdownNotes';


const NotesPage = () => {
    const userId = "default_userid";
    const { noteID } = useParams();
    const [noteData, setNoteData] = useState<DocumentData | null>(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNotes = await fetchUserNotes(userId);
                if (noteID) {

                    if (fetchedNotes && noteID in fetchedNotes) {
                        setNoteData(fetchedNotes[noteID]);
                    } else {
                        console.log('No note with the specified ID was found');
                    }
                } else {
                    console.log("No noteID")
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchNote();
    }, [userId, noteID]);

    console.log(noteData)

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <div className=' p-4 bg-slate-300 m-4 rounded-lg '>
                    <h1>{noteID}</h1>
                    {noteData && noteData.map((note: any) => (
                        <div key={note.name}>
                            <h4 className=' font-semibold'>{note.name}</h4>
                            <div className='flex flex-col gap-2'>

                                {note.subtopics.map((subtopic: any) => (
                                    <a key={subtopic.name} href={`#${subtopic.name}`}>- {subtopic.name}</a>
                                ))}
                            </div>
                        </div>
                    ))
                    }
                </div >
            </ResizablePanel >
            <ResizableHandle className=' bg-black cursor-col-resize border-l-4 border-r-4 border-black' />
            <ResizablePanel>
                <div className='p-4 bg-slate-300 m-4 rounded-lg'>

                    {noteData && noteData.map((note: any, noteIndex: number) => (
                        <div key={noteIndex}>
                            <h2>{note.name}</h2>
                            {note.subtopics && note.subtopics.map((subtopic: any, subtopicIndex: number) => (
                                <div key={subtopicIndex}>
                                    <h3> <a href={subtopic.name}>{subtopic.name}</a></h3>
                                    <MarkdownNotes markdown={subtopic.content} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup >
    );
}

export default NotesPage