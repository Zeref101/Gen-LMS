import { AuthContextWrap } from '@/context/AuthContext';
import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

// AuthLayout
const AuthLayout = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContextWrap);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, isLoading]);

    const isSignup = location.pathname.includes('sign-up');

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <section className='flex h-screen gap-12 flex-1 justify-center items-center '>
                    {/* Outlet will render the child route that matches the current URL */}
                    <Outlet />
                    <img src={`/public/images/${isSignup ? 'signupImage.png' : 'signinImage.png'}`} alt={isSignup ? 'signup' : 'signin'} />
                </section>
            )}
        </>
    )
}

export default AuthLayout;