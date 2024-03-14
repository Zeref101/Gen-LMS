import React from 'react'
import { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Toaster } from "./ui/toaster"
import { useToast } from "./ui/use-toast"

const Mcq = () => {

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [correctOption, setCorrectOption] = useState<number | null>(null);
    const { toast } = useToast()

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        if (correctOption === index) {
            setCorrectOption(null);
        }
        const newOptions = options.filter((_option, i) => i !== index);
        setOptions(newOptions);
        toast({
            title: "Option removed successfully"
        })
    }

    const markAsCorrect = (index: number) => {
        setCorrectOption(index);
        toast({
            title: 'Option marked as correct',
        })
    }
    return (
        <>
            <div className=' h-screen bg-black flex justify-center items-center'>
                <section className=' flex justify-center gap-4 flex-col bg-white w-[500px] rounded-md p-12 place-items-start'>
                    <div className='flex w-full gap-4'>

                        <Input
                            type="text"
                            value={question}
                            onChange={handleQuestionChange}
                            placeholder="Question"
                            className=' bg-[#f1f3f5] p-4'
                        />
                        <Button
                            onClick={() => { }}
                            className=' font-semibold text-[18px] bg-purple-500 hover:bg-purple-700'
                        >add</Button>

                    </div>
                    <div className='flex flex-col gap-4 items-start w-full'>

                        {options.map((option, index) => (
                            <div className=' flex gap-4 justify-center items-center '>
                                <span className=' w-[30px] rounded px-2.5 py-2 flex justify-center items-center bg-pink-500'>
                                    {index + 1}
                                </span>

                                <input
                                    key={index}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e)}
                                    placeholder="Option"
                                    className=' bg-[#f1f3f5] p-2.5 rounded-sm '
                                />
                                <Button
                                    onClick={() => { removeOption(index) }}
                                    className=' bg-red-500 hover:bg-red-700 text-[25px]'

                                >✗</Button>
                                <Button
                                    onClick={() => { markAsCorrect(index) }}
                                    className={correctOption === index ? ' bg-green-500 hover:bg-green-700 text-[25px]' : ' bg-purple-500 hover:bg-purple-700 text-[25px]'}
                                >✓</Button>
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={addOption}
                        className='bg-purple-500 hover:bg-purple-700 text-[25px] font-bold'
                    >+</Button>
                </section>
                <Toaster />
            </div>
        </>
    )
}

export default Mcq
