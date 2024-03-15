import { Link, NavLink } from "react-router-dom"
// import { Button } from "./ui/button"
import { useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { useState } from "react";
import { Button } from "./ui/button";

const LeftSidebar = () => {
    const { pathname } = useLocation();
    const [showCourses, setShowCourses] = useState(false);
    const courses = ['Course 1', 'Course 2', 'Course 3']; // Replace this with your actual list of courses

    return (
        <nav className="hidden md:flex px-6 py-8 flex-col justify-between h-full max-w-[270px] sticky left-0 top-0 border-r border-[#2f2f2f]">
            <div className='flex flex-col gap-11'>
                <Link to="/">
                    <p className=" w-[170px] h-[36px] text-[40px] font-bold text-[#080808]"><span className="text-purple-500">Gen</span>Learn</p>
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
                    <div>
                        <Button onClick={() => setShowCourses(!showCourses)} className={
                            `rounded-lg text-[16px] font-medium leading-[140%] bg-[#a855f71f] text-[#080808] hover:bg-purple-500  hover:text-white transition flex  justify-start items-center w-full py-8 group ${showCourses ? "bg-purple-500 text-white" : ""}`
                        }>
                            Courses
                        </Button>
                        {showCourses && (
                            <div className="flex flex-col gap-4 mt-4">
                                {courses.map((course, index) => (
                                    <NavLink
                                        key={index}
                                        to={`/${course.toLowerCase().replace(' ', '-')}`}
                                        className={`flex gap-4 text-[#080808] items-center  rounded-lg p-4 group-hover:invert bg-[#a855f71f] group-hover:brightness-0 group-hover:transition `}
                                    >
                                        <img src={`/public/icons/home.svg`} alt={`home`} />
                                        {course}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                </ul>

            </div>

        </nav>
    )
}

export default LeftSidebar
