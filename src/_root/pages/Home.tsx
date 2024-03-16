// import React from 'react'
import LeftSidebar from "../../components/LeftSidebar";
import { useNavigate } from "react-router-dom";
import { fetchUserCourses } from "@/lib/backend/User";
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { InfinitySpin } from 'react-loader-spinner';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // const [courses, setCourses] = useState<DocumentData[]>([]);
  const [userCourses, setUserCourses] = useState<DocumentData>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await fetchUserCourses("hello");
        if (courses) {
          setUserCourses(courses);
        } else {
          console.error('Error fetching user courses: courses is undefined');
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
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
    {
      name: "Course 1",
      description: "This is the first course",
      icon: "https://via.placeholder.com/150",
    },
  ];

  const colors = [
    "linear-gradient(90deg, rgba(52,42,204,1) 0%, rgba(68,68,218,1) 40%, rgba(0,212,255,1) 100%)",
    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% )",
    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(249,232,51,1) 0%, rgba(250,196,59,1) 100.2% )",
    "radial-gradient( circle 897px at 9% 80.3%,  rgba(55,60,245,1) 0%, rgba(234,161,15,0.90) 100.2% )",
    "linear-gradient( 58.2deg,  rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7% )",
    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(237,3,32,0.87) 20.8%, rgba(242,121,1,0.84) 74.4% )",
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
  ];

  const progress = [
    {
      course: "Course 1",
      progress: 0.5,
    },
    {
      course: "Course 1",
      progress: 0.2,
    },
    {
      course: "Course 1",
      progress: 0.8,
    },
    {
      course: "Course 1",
      progress: 0.9,
    },
    {
      course: "Course 1",
      progress: 0.1,
    },
    {
      course: "Course 1",
      progress: 0.3,
    },
    {
      course: "Course 1",
      progress: 0.01,
    },
    {
      course: "Course 1",
      progress: 0.0001,
    },
    {
      course: "Course 1",
      progress: 1.0,
    },
    {
      course: "Course 1",
      progress: 0.2,
    },
    {
      course: "Course 1",
      progress: 0.5,
    },
    {
      course: "Course 1",
      progress: 0.5,
    },
  ];

  const timelines = [
    {
      date: "2021-09-01",
      time: "12:00",
      title: "First day of school",
      description: "I am so excited to start my first day of school",
    },
    {
      date: "2021-09-01",
      time: "12:00",
      title: "First day of school",
      description: "I am so excited to start my first day of school",
    },
    {
      date: "2021-09-01",
      time: "12:00",
      title: "First day of school",
      description: "I am so excited to start my first day of school",
    },
    {
      date: "2021-09-01",
      time: "12:00",
      title: "First day of school",
      description: "I am so excited to start my first day of school",
    },
    {
      date: "2021-09-01",
      time: "12:00",
      title: "First day of school",
      description: "I am so excited to start my first day of school",
    },
    {
      date: "2021-09-01",
      time: "12:00",
      title: "First day of school",
      description: "I am so excited to start my first day of school",
    },
  ];
  const currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate);
  return (
    <>
      {loading ? (
        <InfinitySpin
          width="200"
          color="#7e22ce"
          ariaLabel="infinity-spin-loading"
        />
      ) : (
        <div className=" p-4 h-screen w-full">
          <div className="bg-white flex justify-center items-center flex-col rounded-3xl h-full overflow-hidden p-6">
            <div className="flex self-start justify-between items-center">
              <div className="flex space-x-4 items-center">
                <div className="bg-blue-500 text-white p-4 rounded-full">
                  <i className="fas fa-book"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold leading-[140%] text-purple-700 ">Course Activity</h1>
                  <p className="text-gray-400">
                    {new Date().toJSON().slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 h-full w-full">
              <div className="basis-3/5 h-full bg-gray-50 p-4 rounded-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 items-center">
                  </div>
                  <div className="flex space-x-4 items-center">
                  </div>
                </div>
                <div className="h-full overflow-scroll overflow-x-hidden">
                  {userCourses.map((course: DocumentData, index: number) => (
                    <div key={index} className={`flex items-center p-4 rounded-lg`}>
                      <div
                        style={{
                          background: colors[index],
                        }}
                        className="w-full h-full rounded-3xl flex items-center space-x-4 p-4 object-contain"
                      >
                        <img
                          className=" w-[40px] h-[40px]"
                          src={course.image_url}
                          alt="courseImg"

                        />
                        <div className="content basis-4/6">
                          <h3 className="text-white font-semibold">
                            {course.name}
                          </h3>
                          {/* <p className="text-white text-opacity-80 text-sm">
                        {course.description}
                      </p> */}
                        </div>
                        <button
                          onClick={() => {
                            navigate(`/course/${course.course_id}`);
                          }}
                          className="justify-center self-end basis-1/6 flex items-center bg-blue-500 h-full p-4 drop-shadow-buttons rounded-3xl text-white"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex grow basis-1/5 gap-2 flex-col h-full overflow-hidden">
                <div className="bg-gray-50 p-4 rounded-2xl h-1/2 basis-1/2">
                  <h2 className=" text-2xl font-semibold text-purple-700">My learning</h2>
                  <div className=" h-full overflow-scroll">
                    {progress.map((course, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between items-center"
                      >
                        <div className="flex-grow">
                          <h1 className="font-semibold text-purple-600 text-xl">{course.course}</h1>
                        </div>
                        <div className="w-[80%] h-4 rounded-3xl bg-slate-300">
                          <div
                            style={{
                              width: `${course.progress * 100}%`,
                              background: `${colors[index % colors.length]}`,
                            }}
                            className={`h-full rounded-3xl`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl overflow-hidden basis-1/2">
                  <h2 className="text-2xl font-semibold text-purple-700">Timeline</h2>
                  <div className="flex justify-between items-center mt-4"></div>
                  <div className="mt-4 overflow-scroll h-full">
                    {timelines.map((event, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-center gap-4 items-center"
                        >
                          <div className="desc">
                            <h3>{event.title}</h3>
                            <p className="text-slate-400 line-clamp-1">{event.description}</p>
                          </div>
                          <div className="time">
                            <p className=" whitespace-nowrap text-slate-600">
                              {event.date}
                            </p>
                            <p className=" whitespace-nowrap text-slate-600">
                              {event.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
