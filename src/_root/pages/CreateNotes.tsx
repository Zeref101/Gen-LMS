import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useState } from 'react';
import MarkdownNotes from "@/components/MarkdownNotes";

const CreateNotes = () => {
    const [syllabus, setSyllabus] = useState("");
    const [constraints, setConstraints] = useState("");
    const [subject, setSubject] = useState("");
    const [resData, setResData] = useState("")

    const sendRequest = async () => {
        const userString = localStorage.getItem("user");

        // Parsing the string back to an object
        if (userString) {

            const user = JSON.parse(userString);
            if (user) {

                console.log(user.uid)
            }
        }
        const requestBody = {
            syllabus: syllabus,
            constraints: constraints,
            subject: subject
        };
        console.log(requestBody)

        try {
            const result = await axios.post('http://127.0.0.1:8000/create_curriculum/', requestBody);
            setResData(result.data.curriculum)

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {!resData && (

                <div className="w-2/5 p-6 bg-slate-300 flex flex-col gap-2.5 h-1/2 rounded-lg justify-center items-center">
                    <Input value={syllabus} onChange={(e) => setSyllabus(e.target.value)} placeholder="Syllabus" />
                    <Input value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints" />
                    <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
                    <Button onClick={sendRequest}>Send Request</Button>
                </div>
            )}



            {resData && (
                <div className="p-4 mt-6 w-1/2 drop-shadow-md inset-2">
                    <MarkdownNotes markdown={resData} constraints={constraints} subject={subject} />
                </div>
            )}
        </>

    );
}

export default CreateNotes;