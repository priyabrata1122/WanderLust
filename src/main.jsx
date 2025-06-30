import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CreateTrip from './pages/CreateTrip.jsx'
import Header from './component/Header.jsx'
import Results from './pages/Results.jsx'
import { Toaster } from 'sonner'
import { FirebaseProvider } from './context/firebase.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <Header />
        <Toaster />
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/CreateTrip' element={<CreateTrip/>}/>
          <Route path='/Results' element={<Results/>}/>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </StrictMode>,
)