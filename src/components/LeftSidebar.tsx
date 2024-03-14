import { Link, NavLink } from "react-router-dom"
// import { Button } from "./ui/button"
import { useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const LeftSidebar = () => {
    const { pathname } = useLocation();
    return (
        <nav className="hidden md:flex px-6 py-8 flex-col justify-between h-full max-w-[270px] sticky left-0 top-0 border-r border-[#2f2f2f]">
            <div className='flex flex-col gap-11'>
                <Link to="/">
                    <p className=" w-[170px] h-[36px] text-[40px] font-bold text-white"><span className="text-purple-500">Gen</span>Learn</p>
                </Link>
                <Link to={`/profile/profileID`} className="flex justify-start place-items-start gap-3">
                    <img src="/public/icons/profile-placeholder.svg" alt="profile" className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col">
                        <p className="text-[25px] font-bold leading-[140%] text-white">{"Shreyas"}</p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-12">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`rounded-lg text-[16px] font-medium leading-[140%] hover:bg-purple-500 transition group ${isActive && "bg-purple-500"}`}>
                                <NavLink to={link.route} className={`flex gap-4 text-white items-center p-4 group-hover:invert group-hover:brightness-0 group-hover:transition ${isActive && "invert brightness-0 transition"}`}>
                                    <img src={link.imgURL} alt={link.label} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                    <Accordion type="multiple" className=" rounded-b-lg border-b-4">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-white px-2 hover:bg-[#2f2f2f] transition rounded-lg text-[16px] font-medium leading-[140%]">Courses</AccordionTrigger>
                            <AccordionContent className="text-white ">
                                <div className="flex flex-col gap-4 mt-4">

                                    <NavLink
                                        to={`/`}
                                        className={`flex gap-4 text-white items-center bg-[#ac54f42f] rounded-lg p-4 group-hover:invert group-hover:brightness-0 group-hover:transition ${"invert brightness-0 transition"}`}
                                    >
                                        <img src={`/public/icons/home.svg`} alt={`home`} />
                                        {`Home`}
                                    </NavLink>
                                    <NavLink
                                        to={`/`}
                                        className={`flex gap-4 text-white items-center bg-[#ac54f42f] rounded-lg p-4 group-hover:invert group-hover:brightness-0 group-hover:transition ${"invert brightness-0 transition"}`}
                                    >
                                        <img src={`/public/icons/home.svg`} alt={`home`} />
                                        {`Home`}
                                    </NavLink>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </ul>

            </div>

        </nav>
    )
}

export default LeftSidebar
