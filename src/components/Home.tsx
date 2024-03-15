import { useEffect, useRef } from "react";
// import GlobalSearch from "./search/GlobalSearch"
import { motion } from 'framer-motion';

const Home = () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const scrollContainer = scrollContainerRef.current as HTMLDivElement;
            if (scrollContainer) {
                scrollContainer.scrollLeft += e.deltaY;
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <main className='h-screen bg-white'>
            <section className="flex flex-col gap-8 justify-center items-center flex-wrap">
                <div className=" bg-[#ecdffa] w-1/2 h-[200px] p-4 flex flex-row gap-8 rounded-md mt-16">
                    <div className="flex flex-col gap-4 w-1/2">
                        <span className="text-[30px] font-bold leading-[31.2px]">Welcome Student</span>
                        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias quae quibusdam officia dolorem! Nisi expedita excepturi ipsam autem? Delectus, illo.</div>
                    </div>
                    <div className=" flex justify-center items-center mb-10">
                        <img src="/public/images/man-with-laptop-studying-or-working-concept-removebg-preview.png" alt="student" />
                    </div>
                </div>
                <div className="flex w-1/2 flex-col gap-6 ">

                    <span className="text-[30px] font-bold leading-[31.2px]">Upcoming Quizes</span>
                    <div className="flex   overflow-x-scroll hide-scrollbar gap-4" ref={scrollContainerRef} >
                        {[...Array(8)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="w-[350px] h-[200px] bg-red-600"></div>
                            </motion.div>
                        ))}

                    </div>

                </div>
                <div className="flex w-1/2 flex-col gap-6 ">

                    <span className="text-[30px] font-bold leading-[31.2px]">Upcoming Quizes</span>
                    <div className="flex   overflow-x-scroll hide-scrollbar gap-4" ref={scrollContainerRef} >
                        {[...Array(8)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 4 * 0.2 }}
                            >
                                <div className="w-[350px] h-[200px] bg-red-600"></div>
                            </motion.div>
                        ))}

                    </div>

                </div>
            </section>

        </main>
    )
}

export default Home
