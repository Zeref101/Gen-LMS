// import React from 'react'
import LeftSidebar from "../../components/LeftSidebar";

export default function Home() {
  const courses = [
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
  ];

  const colors = [
    "blue",
    "green",
    "#CCCC00",
    "purple",
    "pink",
    "orange",
    "indigo",
    "violet",
    "cyan",
    "magenta",
    "teal",
    "lime",
    "brown",
    "gray",
    "black",
    "white",
  ];

  const progress = [
    {
      progress: 0.5,
    },
    {
      progress: 0.2,
    },
    {
      progress: 0.8,
    },
    {
      progress: 0.9,
    },
    {
      progress: 0.1,
    },
    {
      progress: 0.3,
    },
    {
      progress: 0.01,
    },
    {
      progress: 0.0001,
    },
    {
      progress: 1.0,
    },
    {
      progress: 0.2,
    },
    {
      progress: 0.5,
    },
    {
      progress: 0.5,
    },
  ];
  const currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate);
  return (
    <div className="flex justify-center items-center w-full gap-5 h-screen">
      <div className="sidebar w-full h-full">
        <LeftSidebar></LeftSidebar>
      </div>
      <div className="courses overflow-hidden w-full h-full flex flex-col items-center p-10 bg-slate-200 rounded-[100px]">
        <div className="heading self-start">
          <h1>Course Activity</h1>
          <h2>{currentDate}</h2>
        </div>
        <div className=" text-slate-700">Courses</div>
        <div className="h-screen overflow-scroll p-10 overflow-x-hidden w-full">
          {courses.map((course, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: `${colors[index % colors.length]}`,
                  // opacity: "0.5",
                }}
                className={`my-5 rounded-[50px] text-white h-40 flex justify-center items-center w-full p-8 gap-5`}
              >
                <div className="p-2 flex justify-center items-center h-full basis-1/3 w-full">
                  <img src={course.icon} alt="" />
                </div>
                <div className="h-full w-full">
                  <div className=" font-extrabold text-3xl">{course.name}</div>
                  <div className="font-semibold text-xl">
                    {course.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="misc flex flex-col w-full h-full">
        <div className="topic">Myself</div>
        <div className="w-full h-full overflow-scroll">
          <h1 className="text-slate-800 font-semibold text-3xl">My Learning</h1>
          <div>
            {progress.map((course, index) => {
              return (
                <div>
                  <div className="text-slate-800 font-semibold text-2xl">{`Course ${
                    index + 1
                  }`}</div>
                  <div className="w-full h-5 bg-slate-400 rounded-[50px]">
                    <div
                      className="h-full bg-slate-600 rounded-[50px]"
                      style={{ width: `${course.progress * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full"></div>
      </div>
    </div>
  );
}
