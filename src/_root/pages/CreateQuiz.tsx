import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FormEvent, useState } from "react";
// import MarkdownNotes from "@/components/MarkdownNotes";
import { InfinitySpin } from "react-loader-spinner";
// import { Timestamp } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface data {
  question: string;
  choices: string[];
  correct: number;
  quiz_id: string;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { courseID } = useParams();
  console.log(courseID);
  const [syllabus, setSyllabus] = useState("");
  const [constraints, setConstraints] = useState("");
  const [name, setName] = useState<string>();
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState<string>();
  //   const [question, setQuestion] = useState<string>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [resData, setResData] = useState<data[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<string>();
  const [context, setContext] = useState<string>();

  const sendRequest = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(questionIndex);
    const userString = localStorage.getItem("user");

    // Parsing the string back to an object
    if (userString) {
      const user = JSON.parse(userString);
      if (user) {
        console.log(user.uid);
      }
    }
    const requestBody = {
      number: syllabus,
      prompt: constraints,
      subject: subject,
      end_date: date,
      course_id: courseID,
      difficulty: difficulty,
      context: context,
      name: name,
    };
    console.log(requestBody);

    try {
      const result = await axios.post(
        `${process.env.URL}/generate_quiz/`,
        requestBody
      );
      setResData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const id = () => {
      if (resData) return resData[0].quiz_id;
    }
    console.log({
      questions: resData,
      quiz_id: id(),
    });
    try {
      setIsLoading(true);
      // resData.quiz_id = quizID;
      const result = await axios.post(
        `${process.env.URL}/update_quiz/`,
        {
          questions: resData,
          quiz_id: id(),
        }
      );
      console.log(result);
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className=" min-h-screen w-full flex justify-center items-center">
        {isLoading && (
          <InfinitySpin
            width="200"
            color="#7e22ce"
            // @ts-ignore
            ariaLabel="infinity-spin-loading"
          />
        )}
        {!resData && !isLoading && (
          <div className="w-[500px] p-2 bg-[#a855f71f] flex flex-col gap-2.5 shadow-xl h-[700px] rounded-lg justify-center items-center">
            <div className=" flex flex-col gap-4 justify-center items-center">
              <h2 className="text-2xl text-purple-700 font-semibold">
                Create a new quiz
              </h2>
              <Input
                type="number"
                className=" bg-[#ffffffa9] "
                value={syllabus}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  // Check if the input is a non-negative number before updating the state
                  if (!isNaN(inputValue) && inputValue >= 0) {
                    setSyllabus(inputValue.toString()); // Update the state with a positive number
                  }
                }}
                placeholder="Number Of Questions"
              />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <Input
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="Prompt"
              />
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
              />
              <Input
                type="date"
                value={date} // Handle Timestamp differently
                onChange={(e) => {
                  //   const selectedDate = new Date(e.target.value);
                  //   const timestamp = Timestamp.fromDate(selectedDate);
                  //   setDate(timestamp); // Update the state with the timestamp value
                  setDate(e.target.value);
                }}
                placeholder="Subject"
              />
              <select
                className="bg-[#fffffff9] w-[250px] p-2 rounded-lg"
                title="hi"
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                }}
              >
                <option value="">Please select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <Textarea
                value={context}
                onChange={(e) => {
                  setContext(e.target.value);
                }}
                placeholder="Type your context here."
              />
              <Button
                onClick={sendRequest}
                className=" bg-purple-500 hover:bg-purple-800 text-white w-[250px]"
              >
                Send Request
              </Button>
            </div>
          </div>
        )}
        {resData && !isLoading && (
          <div className="p-4 mt-6 w-full drop-shadow-md gap-4 flex flex-col justify-center items-center inset-2">
            {resData.map((data: data, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded-2xl border-black border-2 flex flex-col gap-4 justify-center items-center"
                >
                  <Input
                    onFocus={() => setQuestionIndex(index)}
                    className="block text-2xl rounded-2xl text-purple-700 font-semibold"
                    value={data.question}
                    onChange={(e) => {
                      const newData = [...resData];
                      newData[index].question = e.target.value;
                      setResData(newData);
                    }}
                    placeholder="Question"
                  />
                  <div className="flex flex-col w-full gap-4 justify-center items-center">
                    {data.choices.map((choice: string, choiceIndex) => {
                      return (
                        <input
                          title="hi"
                          key={choiceIndex}
                          className="bg-[#ffffffa9] w-full p-2 rounded-2xl"
                          type="text"
                          value={choice}
                          onChange={(e) => {
                            const newChoices = [...resData[index].choices];
                            newChoices[choiceIndex] = e.target.value;
                            const updatedData = [...resData];
                            updatedData[index].choices = newChoices;
                            setResData(updatedData);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <button
              onClick={handleSubmit}
              className="bg-purple-500 rounded-3xl p-2 text-white font-bold"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateQuiz;
