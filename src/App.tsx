import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login';
import Dash from './Pages/Dashboard/Dash';


function App() {

  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path='Dashboard' element={<Dash/>} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
