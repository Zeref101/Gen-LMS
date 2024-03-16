import { Link, NavLink } from "react-router-dom"
// import { Button } from "./ui/button"
import { useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { fetchUserCourses } from "@/lib/backend/User";
import { DocumentData } from "firebase/firestore";


const LeftSidebar = () => {
    const { pathname } = useLocation();
    const [showCourses, setShowCourses] = useState(false);
    const [userCourses, setUserCourses] = useState<DocumentData>([]);
    const courses = ['Course 1', 'Course 2', 'Course 3']; // Replace this with your actual list of courses
    const onNotesPage = pathname.includes("/notes");
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
          }
        };
        fetchCourses();
      }, []);
    return (
        <div className="hidden md:flex px-6 py-8 flex-col justify-between bg-gray-50 rounded-lg h-full w-full sticky left-0 top-0 border border-[#2f2f2f]">
            <div className='flex flex-col gap-11'>
                <Link to="/">
                    <p className=" w-full h-[36px] text-[40px] font-bold text-[#080808]"><span className="text-purple-500">Gen</span>Learn</p>
                </Link>
                <Link to={`/profile/profileID`} className="flex justify-start place-items-start gap-3">
                    <img src="/public/icons/profile-placeholder.svg" alt="  profile" className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col">
                        <p className="text-[25px] font-bold leading-[140%] text-[#080808]">{"Shreyas"}</p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-8">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`rounded-lg text-[16px] font-medium leading-[140%] hover:bg-purple-500 transition group ${isActive && "bg-purple-500"}`}>
                                <NavLink to={link.route} className={`flex bg-[#a855f71f] gap-4 text-[#080808] items-center rounded-lg p-4 group-hover:invert group-hover:brightness-0 group-hover:transition ${isActive && "invert brightness-0 transition"}`}>
                                    <img src={link.imgURL} alt={link.label} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                    {onNotesPage && (
                        <>

                            <li>
                                <NavLink to="/create-notes" className="flex gap-4 text-[#080808] items-center hover:bg-purple-500  rounded-lg p-4 group-hover:invert bg-[#a855f71f] group-hover:brightness-0 group-hover:transition">
                                    {/* Add appropriate icon or content for "Create Notes" */}
                                    <img src="/public/icons/png-transparent-notebook-note-taking-notebook-miscellaneous-infographic-angle-thumbnail-removebg-preview.png" alt="Create Notes" width={24} height={24} />
                                    Create Notes
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div>
                        <Button onClick={() => setShowCourses(!showCourses)} className={
                            `rounded-lg text-[16px] font-medium leading-[140%] bg-[#a855f71f] text-[#080808] hover:bg-purple-500  hover:text-white transition flex  justify-start items-center w-full py-8 group ${showCourses ? "bg-purple-500 text-white" : ""}`
                        }>
                            Courses
                        </Button>
                        {showCourses && (
                            <div className="flex flex-col gap-4 mt-4">
                                {userCourses.map((course:DocumentData, index:number) => (
                                    <NavLink
                                        key={index}
                                        to={`/course/${course.course_id}`}
                                        className={`flex gap-4 text-[#080808] items-center  rounded-lg p-4 group-hover:invert bg-[#a855f71f] group-hover:brightness-0 group-hover:transition `}
                                    >
                                        <img src={`/public/icons/home.svg`} alt={`home`} />
                                        {course.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                </ul>

            </div>

        </div>
    )
}

export default LeftSidebar
