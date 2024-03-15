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
        course1: 0.5,
    },
    {
        course2: 0.2,
    },
    {
        course3: 0.8,
    },
    {
        course4: 0.9,
    },
    {
        course5: 0.1,
    },
    {
        course6: 0.3,
    },
    {
        course7: 0.5,
    },
  ];
  let currentDate = new Date().toJSON().slice(0, 10);
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
        </div>
        <div className="w-full h-full"></div>
      </div>
    </div>
  );
}
