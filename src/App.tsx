import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/forms/SignupForm';
import { Toaster } from './components/ui/toaster';
import SigninForm from './_auth/forms/SigninForm';
import CoursePage from './_root/pages/CoursePage';

const App = () => {
  return (
    <Router>
      <main className=" h-screen bg-dark-1 bg-[#eee]">
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>
          {/* Private Routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/course/:courseID/' element={<CoursePage/>}/>
          </Route>

        </Routes>
        <Toaster />
      </main>
    </Router>
  );
};

export default App;
