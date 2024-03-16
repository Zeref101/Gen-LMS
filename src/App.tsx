import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/forms/SignupForm';
import { Toaster } from './components/ui/toaster';
import SigninForm from './_auth/forms/SigninForm';
import CoursePage from './_root/pages/CoursePage';
import NotesPage from './_root/pages/NotesPage';
import Note from './_root/pages/Note';
import CreateNotes from './_root/pages/CreateNotes';
import Quizzes from './_root/pages/Quiz';
import MCQ from './_root/pages/MCQ';
import TeacherQuiz from './_root/pages/TeacherQuiz';
import CreateQuiz from './_root/pages/CreateQuiz';
import Assignment from './_root/pages/Assignment';

const App = () => {
  const isTeacher = false;
  return (
    <Router>
      <main className=" min-h-screen bg-dark-1 bg-[#eee]">
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>
          {/* Private Routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/course/:courseID/' element={<CoursePage />} />
            <Route path='/notes' element={<Note />} />
            <Route path="/notes/:noteID" element={<NotesPage />} />
            <Route path="/create-notes" element={<CreateNotes />} />
            <Route path='/course/:courseID/quizzes' element={(!isTeacher) ? <Quizzes /> : <TeacherQuiz />} />
            <Route path='/course/:courseID/quizzes/:quizID' element={<MCQ />} />
            <Route path='/course/:courseID/quizzes/createQuiz' element={<CreateQuiz />} />

            <Route path='/course/:courseID/assignment' element={<Assignment />} />
          </Route>

        </Routes>
        <Toaster />
      </main>
    </Router>
  );
};

export default App;
