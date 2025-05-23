import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './Pages/Login/Login';
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
            <Route path='Dashboard' element={<Dash />} />
            <Route path='Inventory' element={<Inventory />} />
            <Route path='Reports' element={<Reports />} />
            <Route path='Suppliers' element={<Suppliers />} />
            <Route path='Orders' element={<Orders />} />
            <Route path='ManageStore' element={<ManageStore />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
