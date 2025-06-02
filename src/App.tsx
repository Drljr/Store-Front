import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/Signup';
import Dash from './Pages/Dashboard/Dash';
import Inventory from './Pages/Inventory/Inventory';
import Reports from './Pages/Reports/Reports';
import Suppliers from './Pages/Suppliers/Suppliers';
import Orders from './Pages/Orders/Orders';
import ManageStore from './Pages/Manage-Store/Manage-Store';


function App() {

  return (
    <div className='flex-1'>
        <Router>
          <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dash />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/suppliers' element={<Suppliers />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/manage-store' element={<ManageStore />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
