import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from "./ui/use-toast";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';



interface MarkdownNotesProps {
    markdown: string;
    constraints?: string;
    subject?: string;
    user_id?: string;
}

const MarkdownNotes: React.FC<MarkdownNotesProps> = ({ markdown, constraints = '', subject = '', user_id = '' }) => {

    const { toast } = useToast();
    const [editableMarkdown, setEditableMarkdown] = useState(markdown);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableMarkdown(event.target.value);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            toast({
                title: "You have saved the Note",
            });
        } else {
            toast({
                title: "You are in Editing mode",
            });
        }
    };
    const [isLoading, setIsLoading] = useState(false);

    const generateMarkdown = async () => {
        setIsLoading(true);
        const requestBody = {
            markdown_text: editableMarkdown,
            constraints: constraints,
            subject: subject,
            user_id: user_id

        };

        try {
            const response = await axios.post(`${process.env.URL}/generate_md/`, requestBody);
            console.log(response.data);
            navigate('/notes')

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <InfinitySpin
                    width="200"
                    color="#4fa94d"
                    // @ts-ignore
                    ariaLabel="infinity-spin-loading"
                />
            ) : (

                <div className="flex flex-col justify-center items-start bg-[#efe5f9] w-full rounded-lg p-4 text-black text-[20px] drop-shadow-sm max-h-screen overflow-y-auto">
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

                </div>
            )}
        </>

    );
};

export default MarkdownNotes;