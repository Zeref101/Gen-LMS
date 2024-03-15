// import LeftSidebar from '@/components/LeftSidebar';
import { AuthContextWrap } from '@/context/AuthContext';
import { useContext, } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    const { isAuthenticated } = useContext(AuthContextWrap);

    return (
        <>
            {isAuthenticated && (
                <>
                    <section className='flex flex-1 justify-center items-center flex-col'>
                        {/* Outlet will render the child route that matches the current URL */}
                        <Outlet />
                    </section>
                </>
            )}



        </>
    );
}

export default RootLayout;