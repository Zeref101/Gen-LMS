import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import TextSelect from './components/TextSelect.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <TextSelect>
      <App />
    </TextSelect>
  </AuthProvider>
  // </React.StrictMode>,
)