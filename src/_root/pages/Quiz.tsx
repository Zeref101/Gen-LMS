import React, { useEffect, useState } from "react";
// import Mcq from "@/components/Mcq";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import LeftSidebar from "@/components/LeftSidebar";
import { useParams } from "react-router-dom";
import { fetchStudentquiz } from "@/lib/backend/User";
import { Submitted_Quiz, Quiz } from "@/lib/backend/User";

export default function Quizzes() {
  const { courseID } = useParams<string>();
  const [unattemptedQuizzes, setunAttemptedQuizzes] = useState<Quiz[]>([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState<Submitted_Quiz[]>(
    []
  );
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
        const unattemptedQuizzes = all.filter((quiz) =>
          !attemptedQuizzesSet.has(quiz.id)
        );
        console.log("unattempted", unattemptedQuizzes);
        setunAttemptedQuizzes(unattemptedQuizzes); // Assuming you wanted unattempted here based on your filter logic
        console.log(submitted, "submitted")
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
        <aside className="w-64 bg-white min-h-screen p-4">
          <div className="text-gray-900 font-bold">Fikri Studio</div>
          <LeftSidebar></LeftSidebar>
        </aside>
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome, Theresa
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
                  <div className="flex flex-col w-full h-full overflow-scroll overflow-x-hidden" >
                    <h1>Attempted Quizzes</h1>
                    {attemptedQuizzes.map((quiz, index) => {
                      return <div key={index} className={`flex items-center rounded-lg`}>
                      <div
                        className="w-full bg-green-500 h-full rounded-3xl flex justify-between items-center p-2 "
                      >
                          <h3 className="text-white font-semibold">
                            {quiz.id}
                          </h3>
                          <p className="text-black bg-white p-4 rounded-2xl">
                            {quiz.marks_scored}
                          </p>
                      </div>
                    </div>
                    })}
                  </div>
                ) : (
                  <div>No Attempted Quizzes</div>
                )}
              </div>
              {/* Widget */}
              {/* <div className="bg-white p-4 rounded-lg shadow flex justify-center items-center">
                <svg width="160" height="160" viewBox="0 0 32 32">
                  <circle
                    r="16"
                    cx="16"
                    cy="16"
                    fill="transparent"
                    stroke="#34D399"
                    strokeWidth="4"
                    strokeDasharray="calc(32 * 3.14)"
                    strokeDashoffset="calc(32 * 3.14 * ((100 - 80) / 100))"
                  />
                  <circle
                    r="16"
                    cx="16"
                    cy="16"
                    fill="transparent"
                    stroke="#60A5FA"
                    strokeWidth="4"
                    strokeDasharray="calc(32 * 3.14)"
                    strokeDashoffset="0"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill="#1F2937"
                    dy=".3em"
                    fontWeight="bold"
                    fontSize="4"
                  >
                    80%
                  </text>
                </svg>
              </div> */}
              {/* Widget */}
              <div className="bg-white p-4 rounded-lg shadow">
                {unattemptedQuizzes.length > 0 ? (
                  <div className="flex flex-col w-full h-full overflow-scroll overflow-x-hidden" >
                    <h1>Unattempted Quizzes</h1>
                    {unattemptedQuizzes.map((quiz, index) => {
                      return <div key={index} className={`flex items-center rounded-lg`}>
                      <div
                        className="w-full bg-red-400 h-full rounded-3xl flex justify-between items-center p-2 "
                      >
                          <h3 className="text-white font-semibold">
                            {quiz.id}
                          </h3>
                          <p className="text-black bg-white p-4 rounded-2xl">
                          {quiz.end_date.toString()}
                          </p>
                      </div>
                    </div>
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
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500">Learner Insight</div>
                <div className="flex justify-between items-center">
                  <div className="w-full">
                    {/* Bar chart */}
                    <div className="flex flex-col items-end">
                      <div className="chart-bar" style={{ width: "80%" }}></div>
                      <div className="chart-bar" style={{ width: "60%" }}></div>
                      <div className="chart-bar" style={{ width: "70%" }}></div>
                      <div className="chart-bar" style={{ width: "90%" }}></div>
                      <div className="chart-bar" style={{ width: "50%" }}></div>
                      {/* More bars */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
