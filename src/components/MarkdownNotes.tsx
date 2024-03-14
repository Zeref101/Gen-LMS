import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface MarkdownNotesProps {
    markdown: string;
}

const MarkdownNotes: React.FC<MarkdownNotesProps> = ({ markdown }) => {
    const [editableMarkdown, setEditableMarkdown] = useState(markdown);
    const [isEditing, setIsEditing] = useState(false);


    const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableMarkdown(event.target.value);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex flex-col justify-center items-start bg-[#08082a] w-1/2 border-2 border-[#7b7bf3] rounded-lg p-4 text-white text-[20px]">

            <div className='flex gap-8'>

                <Button onClick={toggleEditMode} className='border bg-[#7b7bf3] mb-4 w-[100px] hover:bg-[#7b7bf3cf]'>{isEditing ? 'Save' : 'Edit'}</Button>
                <Button onClick={() => { }} className='border-green-900 bg-green-500 mb-4 w-[100px] hover:bg-green-700'>Save</Button>
            </div>

            {isEditing ? (
                <Textarea value={editableMarkdown} onChange={handleMarkdownChange} className='h-screen bg-[#f3f3f328] text-[#eee] text-[15px]' />
            ) : (
                <ReactMarkdown children={editableMarkdown} />
            )}
        </div>
    );
};

export default MarkdownNotes;