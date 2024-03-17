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
    const userId = "cache";
    const { noteID } = useParams();
    const [noteData, setNoteData] = useState<DocumentData | null>(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNotes = await fetchUserNotes(userId);
                if (noteID) {
                    if (fetchedNotes && noteID in fetchedNotes) {
                        setNoteData(fetchedNotes[noteID]);
                        // Set the first subtopic of the first note as the default selected subtopic
                        if (fetchedNotes[noteID].length > 0 && fetchedNotes[noteID][0].subtopics.length > 0) {
                            setSelectedSubtopic(fetchedNotes[noteID][0].subtopics[0]);
                        }
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
        <ResizablePanelGroup direction="horizontal" className='h-screen overflow-hidden'>
            <ResizablePanel defaultSize={20} className='overflow-auto'>
                <div className=' p-4 bg-[#a855f71f] m-4 rounded-lg '>
                    <h1>{noteID}</h1>
                    {noteData && noteData.map((note: any) => (
                        <div key={note.name}>
                            <h4 className=' font-semibold'>{note.name}</h4>
                            <div className='flex flex-col gap-2'>
                                {note.subtopics.map((subtopic: any) => (
                                    <a
                                        key={subtopic.name}
                                        href={`#${subtopic.name}`}
                                        onClick={() => setSelectedSubtopic(subtopic)}
                                    >
                                        - {subtopic.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div >
            </ResizablePanel >
            <ResizableHandle className=' bg-black cursor-col-resize border-l-4 border-r-4 border-black' />
            <ResizablePanel defaultSize={80} className='overflow-auto'>
                <div className='p-4 bg-[#a855f71f] m-4 rounded-lg'>

                    {selectedSubtopic && (
                        <div>
                            {/*@ts-ignore*/}
                            <h2>{selectedSubtopic.name}</h2>
                            {/*@ts-ignore*/}
                            <MarkdownNotes key={selectedSubtopic.name} markdown={selectedSubtopic.content} />
                        </div>
                    )}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup >
    );
}

export default NotesPage