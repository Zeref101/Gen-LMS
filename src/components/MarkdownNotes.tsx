import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import axios from 'axios';
import { useLocation } from 'react-router-dom';


interface MarkdownNotesProps {
    markdown: string;
    constraints?: string;
    subject?: string;
}

const MarkdownNotes: React.FC<MarkdownNotesProps> = ({ markdown, constraints = '', subject = '' }) => {

    const { toast } = useToast();
    const [editableMarkdown, setEditableMarkdown] = useState(markdown);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();


    const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableMarkdown(event.target.value);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            toast({
                title: "You are in Editing mode",
            });
        } else {
            toast({
                title: "You have saved the Note",
            });
        }
    };
    const generateMarkdown = async () => {
        const requestBody = {
            markdown_text: editableMarkdown,
            constraints: constraints,
            subject: subject
        };

        try {
            const response = await axios.post('http://localhost:8000/generate_md/', requestBody);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-start bg-slate-300 w-full rounded-lg p-4 text-black text-[20px] max-h-screen overflow-y-auto">
            {!location.pathname.startsWith('/notes') && (
                <div className='flex gap-8'>
                    <Button
                        onClick={toggleEditMode}
                        className='border bg-[#7b7bf3] mb-4 w-[100px] hover:bg-[#7b7bf3cf]'
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    <Button
                        onClick={generateMarkdown}
                        className='border-green-900 bg-green-500 mb-4 w-[100px] hover:bg-green-700'
                    >
                        Save
                    </Button>
                </div>
            )}
            {isEditing ? (
                <Textarea
                    value={editableMarkdown}
                    onChange={handleMarkdownChange}
                    className='h-[70vh] bg-[#f3f3f328] text-[#080808] text-[15px] overflow-y-auto'
                />
            ) : (
                <div className='h-[70vh] w-full overflow-y-auto markdown-content'>
                    <ReactMarkdown children={editableMarkdown} />
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default MarkdownNotes;