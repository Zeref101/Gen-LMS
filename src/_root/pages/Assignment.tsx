import { Textarea } from "@/components/ui/textarea"

const Assignment = () => {
    const questions = [
        "What is TypeScript and why would you use it over JavaScript?",
        "How do you define a variable in TypeScript?",
        "What are the different data types available in TypeScript?",
        "How do you define an interface in TypeScript?",
        "What is the difference between an interface and a type in TypeScript?",
        "How do you define a class in TypeScript?",
        "How do you use generics in TypeScript?",
        "What is the purpose of the 'any' type in TypeScript?",
        "How do you create a readonly property in TypeScript?",
        "What is a tuple in TypeScript and how do you use it?"
    ];
    return (
        <div className="flex flex-col min-h-screen p-4 w-full">
            <div className="flex flex-col p-4 w-1/2">
                <h1 className="text-purple-600 font-bold">Assignment</h1>
                <blockquote className="italic text-lg mt-1">
                    <p>"Education is the most powerful weapon which you can use to change the world."</p>
                    <footer className="text-right">- Nelson Mandela</footer>
                </blockquote>
            </div>
            <div className="flex flex-col gap-4">
                {questions.map((quest) => {
                    return (
                        <div className=" w-full bg-[#a855f71f] flex flex-col gap-4 p-4 rounded-lg ">
                            <h1 className=" text-[20px] font-semibold text-purple-700">{quest}</h1>
                            <Textarea className="shadow-lg w-3/4" placeholder="Type your answer here" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Assignment
