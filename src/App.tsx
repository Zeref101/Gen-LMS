import student from "../public/images/man-with-laptop-studying-or-working-concept-removebg-preview.png"
import GlobalSearch from "./components/search/GlobalSearch"


function App() {

  return (
    <main className='h-screen bg-white'>
      <section className="flex flex-col gap-8 justify-center items-center">
        <GlobalSearch />
      </section>

      <img src={student} alt="student" className="w-[]" />
    </main>
  )
}


export default App
