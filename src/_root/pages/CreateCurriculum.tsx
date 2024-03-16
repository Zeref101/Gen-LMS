import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';


const CreateCurriculum = () => {
    const [syllabus, setSyllabus] = useState("");
    const [constraints, setConstraints] = useState("");
    const [subject, setSubject] = useState("");

    const sendRequest = async () => {
        const requestBody = {
            syllabus: syllabus,
            constraints: constraints,
            subject: subject
        };

        try {
            const response = await axios.post('http://127.0.0.1:5500/create_curriculum/', requestBody);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Input value={syllabus} onChange={(e) => setSyllabus(e.target.value)} placeholder="Syllabus" />
            <Input value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints" />
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
            <Button onClick={sendRequest}>Send Request</Button>
        </div>
    );
}

export default CreateCurriculum;