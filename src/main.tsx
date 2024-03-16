import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import TextSelect from './components/TextSelect.tsx'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <TextSelect>
        <App />
      </TextSelect>
    </AuthProvider>
  </Router>
  // </React.StrictMode>,
)