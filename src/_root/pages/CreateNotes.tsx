import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useState } from 'react';
import MarkdownNotes from "@/components/MarkdownNotes";
import { InfinitySpin } from 'react-loader-spinner';
// import TextSelect from "@/components/TextSelect";

const CreateNotes = () => {
    const [syllabus, setSyllabus] = useState("");
    const [constraints, setConstraints] = useState("");
    const [subject, setSubject] = useState("");
    const [resData, setResData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = async () => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className=" h-screen w-full flex justify-center items-center">
                {isLoading && (
                    <InfinitySpin
                        width="200"
                        color="#7e22ce"
                        ariaLabel="infinity-spin-loading"
                    />
                )}
                {!resData && !isLoading && (
                    <div className="w-[500px] p-2 bg-[#a855f71f] flex flex-col gap-2.5 shadow-xl h-[400px] rounded-lg justify-center items-center">
                        <div className=" flex flex-col gap-4 justify-center items-center">
                            <h2 className="text-2xl text-purple-700 font-semibold">Create a new note</h2>
                            <Input className=" bg-[#ffffffa9] " value={syllabus} onChange={(e) => setSyllabus(e.target.value)} placeholder="Syllabus" />
                            <Input value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints" />
                            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
                            <Button onClick={sendRequest} className=" bg-purple-500 hover:bg-purple-800 text-white w-[250px]">Send Request</Button>
                        </div>
                    </div>
                )}
                {resData && !isLoading && (
                    <div className="p-4 mt-6 w-full drop-shadow-md inset-2">

                        <MarkdownNotes markdown={resData} constraints={constraints} subject={subject} />

                    </div>
                )}
            </div>
        </>
    );
}

export default CreateNotes;