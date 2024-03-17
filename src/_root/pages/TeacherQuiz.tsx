import React, { useEffect, useState } from "react";
// import Mcq from "@/components/Mcq";
import { Line } from "react-chartjs-2";
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
// import LeftSidebar from "@/components/LeftSidebar";
import { useParams } from "react-router-dom";
import { fetchStudentquiz } from "@/lib/backend/User";
import { Submitted_Quiz, Quiz } from "@/lib/backend/User";

export default function TeacherQuiz() {
  const { courseID } = useParams<string>();
  const [setunAttemptedQuizzes] = useState<Quiz[]>([]);
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
      <div className="flex h-full">
        <main className="flex-1 overflow-hidden h-full w-full">
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
              <div className="ml-4">
                <button onClick={() => {
                  navigate(`/course/${courseID}/quizzes/createQuiz`)
                }} className="bg-green-500 rounded-full text-sm px-4 py-2">
                  Create Quiz <i className="fas fa-chevron-down"></i>
                </button>
              </div>
            </div>
          </header>
          {/* Main content */}
          <div className="p-4 overflow-hidden h-[88%] w-full">
            {/* Dashboard widgets */}
            <div className="flex w-full h-full">
              {/* Widget */}
              <div className="bg-white w-full p-4 rounded-lg shadow">
                {attemptedQuizzes.length > 0 ? (
                  <div className="flex flex-col w-full gap-4 h-full overflow-scroll overflow-x-hidden">
                    <h1>Created Quizzes</h1>
                    {attemptedQuizzes.map((quiz, index) => {
                      return (
                        <div
                          key={index}
                          className={`flex items-center rounded-lg`}
                        >
                          <div className="w-full bg-green-500 h-full rounded-3xl flex justify-between items-center p-2 ">
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
                ) : (
                  <div>No Created Quizzes</div>
                )}
              </div>

            </div>
            {/* Charts */}
            {/* <div className="mt-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500">Learner Insight</div>
                <div className="flex justify-between items-center">
                  <div className="w-full">
                    Bar chart
                    <div className="flex flex-col items-end">
                      <div className="chart-bar" style={{ width: "80%" }}></div>
                      <div className="chart-bar" style={{ width: "60%" }}></div>
                      <div className="chart-bar" style={{ width: "70%" }}></div>
                      <div className="chart-bar" style={{ width: "90%" }}></div>
                      <div className="chart-bar" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
