import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

//import{Button} from 'antd'
import Login from './pages/Login'
import Register from './pages/Register'
import ApplyEmployee from './pages/ApplyEmployee';
import Notification from './pages/Notifications';
import { Toaster } from 'react-hot-toast';
//import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import EmployeeList from './pages/Admin/EmployeesList';
import Profile from './pages/Employee/Profile';
function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <BrowserRouter>
      {loading && (<div className="spinner-parent">
        <div className="spinner-border" role="status">

        </div>
      </div>)}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
        <Route path='/applyemployee' element={<ProtectedRoute><ApplyEmployee /></ProtectedRoute>} />
        <Route path='/employeelist' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path='/employee/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
