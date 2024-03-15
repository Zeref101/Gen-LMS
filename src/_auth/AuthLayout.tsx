import { AuthContextWrap } from '@/context/AuthContext';
import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// AuthLayout
const AuthLayout = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContextWrap);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, isLoading]);

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (

                <>
                    <section className='flex flex-1 justify-center items-center flex-col'>
                        {/* Outlet will render the child route that matches the current URL */}
                        <Outlet />
                    </section>
                </>
            )}
        </>
    )
}

export default AuthLayout
