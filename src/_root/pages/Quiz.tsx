import { useEffect, useState } from "react";
// import Mcq from "@/components/Mcq";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { timestampToDate } from "@/lib/util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchStudentquiz } from "@/lib/backend/User";
import { Submitted_Quiz, Quiz } from "@/lib/backend/User";
import { Button } from "@/components/ui/button";

export default function Quizzes() {
  const { courseID } = useParams<string>();
  const [unattemptedQuizzes, setunAttemptedQuizzes] = useState<Quiz[]>([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState<Submitted_Quiz[]>(
    []
  );
  const navigate = useNavigate();
  // console.log(courseID);
  useEffect(() => {
    async function fetchquiz() {
      if (courseID) {
        const quizzes = await fetchStudentquiz(courseID);
        console.log("quiz", quizzes);
        const all = quizzes[0];
        const submitted = quizzes[1];
        console.log("hehe", all, submitted);
        // Assuming `fetchStudentquiz` is modified to return [Quiz[], Submitted_Quiz[]]
        const attemptedQuizzesSet = new Set(submitted.map((sq) => sq.quiz_id));
        const unattemptedQuizzes = all.filter(
          (quiz) => !attemptedQuizzesSet.has(quiz.id)
        );
        console.log("unattempted", unattemptedQuizzes);
        setunAttemptedQuizzes(unattemptedQuizzes); // Assuming you wanted unattempted here based on your filter logic
        console.log(submitted, "submitted");
        if (submitted.length > 0) {
          setAttemptedQuizzes(submitted);
        }
      }
    }

    fetchquiz();
  }, [courseID]);
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="flex">

        <main className="flex-1">
          {/* Header */}
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome,
              </h1>
              <span className="ml-2 text-gray-500">
                Here's what happened with your learning system
              </span>
            </div>
            <div className="flex items-center">
              <button title="hi" className="rounded-full bg-gray-200 p-2 mr-2">
                <i className="fas fa-plus"></i>
              </button>
              <button title="hi" className="rounded-full bg-gray-200 p-2 mr-2">
                <i className="fas fa-bell"></i>
              </button>
              <div className="relative">
                <input
                  type="text"
                  className="rounded-full bg-gray-200 p-2"
                  placeholder="Search"
                />
              </div>
              <div className="ml-4">
                <button className="bg-gray-300 rounded-full text-sm px-4 py-2">
                  Theresa <i className="fas fa-chevron-down"></i>
                </button>
              </div>
            </div>
          </header>
          {/* Main content */}
          <div className="p-4">
            {/* Dashboard widgets */}
            <div className="grid grid-cols-2 gap-4">
              {/* Widget */}
              <div className="bg-white p-4 rounded-lg shadow">
                {attemptedQuizzes.length > 0 ? (
                  <div className="flex flex-col p-4 w-full h-full overflow-scroll overflow-x-hidden">
                    <h1>Attempted Quizzes</h1>
                    <div className="flex flex-col  gap-4 ">

                      {attemptedQuizzes.map((quiz, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex gap-4 items-center  rounded-lg `}
                          >
                            <div className="w-full bg-[#22c55eef] h-full rounded-3xl flex items-center justify-between p-1 ">
                              <h3 className="text-white font-semibold">
                                {quiz.name}
                              </h3>
                              <p className="text-black bg-white p-4 rounded-2xl">
                                {quiz.marks_scored}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>No Attempted Quizzes</div>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                {unattemptedQuizzes.length > 0 ? (
                  <div className="flex flex-col gap-4 w-full h-full overflow-scroll overflow-x-hidden">
                    <h1>Unattempted Quizzes</h1>
                    {unattemptedQuizzes.map((quiz, index) => {
                      // @ts-ignore
                      const endDate = timestampToDate(quiz.end_date);
                      console.log(endDate.toString());
                      return (
                        <div
                          key={index}
                          className={`flex items-center rounded-lg`}
                        >
                          <div className="w-full bg-[#ef4444ef] h-full  rounded-3xl flex flex-col gap-2 justify-between items-center px-6 py-4">
                            <div className="flex flex-row justify-between w-full items-center gap-4">
                              <h3 className="text-white font-semibold">
                                {quiz.name}
                              </h3>
                              <p className="text-black flex h-10 justify-center items-center bg-white p-1 text-sm rounded-2xl">
                                {quiz.end_date.toString()}
                              </p>
                            </div>
                            <Button className="bg-red-200 self-end text-black hover:bg-red-300" onClick={() => {
                              navigate(`/course/${courseID}/quizzes/${quiz.id}`)
                            }}>Attempt</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>No Unattempted Quizzes</div>
                )}
                {/* Activity list */}
              </div>
            </div>
            {/* Charts */}
            <div className="mt-4">
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
