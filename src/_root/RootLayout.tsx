// import LeftSidebar from '@/components/LeftSidebar';
import LeftSidebar from '@/components/LeftSidebar';
import { AuthContextWrap } from '@/context/AuthContext';
import { useContext, } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    const { isAuthenticated } = useContext(AuthContextWrap);

    return (
        <>
            {isAuthenticated && (
                <>
                    <div className='w-full h-full p-6 rounded-lg drop-shadow-lg'>
                        <div className='flex w-full h-full bg-white rounded-lg drop-shadow-lg p-4'>
                            <div className=' w-[400px]'>
                                <LeftSidebar />
                            </div>
                            <section className='flex flex-1 justify-center items-center flex-col'>
                                <Outlet />
                            </section>
                        </div>
                    </div>
                </>
            )}



        </>
    );
}

export default RootLayout;