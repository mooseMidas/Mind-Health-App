import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoutes from './components/PrivateRoutes';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import DoctorsList from './pages/Admin/DoctorsList';
import UserList from './pages/Admin/UserList';
import AppointmentList from './pages/Admin/AppointmentList';
import Profile from './pages/Doctor/Profile';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {/* Imported bootstrap spinner */}
      {loading && (
      <div className='spinner-parent'>
        <div className="spinner-border" role="status" />
      </div>
      )}
      <Toaster position='top-left' reverseOrder={false} />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/apply-doctor" element={<ApplyDoctor />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin/doctorlist" element={<DoctorsList />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/appointments" element={<AppointmentList />} />
          <Route path="/doctor/profile/:userId" element={<Profile />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="doctor/appointments" element={<DoctorAppointments />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
