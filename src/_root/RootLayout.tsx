// import LeftSidebar from '@/components/LeftSidebar';
import { AuthContextWrap } from '@/context/AuthContext';
import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const RootLayout = () => {
    const { isAuthenticated } = useContext(AuthContextWrap);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/sign-up');
        } else {
            navigate('/');

        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {!isAuthenticated ? (
                <Navigate to="/sign-up" />
            ) : (
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