import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

// import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/doctor/login" element={<DocLogin />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* <Route path="/doctor/login" element={<DocLogin />} />
      <Route element={<PrivateRoute role="DOCTOR" />}>
        <Route path="/doctor/home" element={<DocHome />} />
        <Route path="/doctor/bookings" element={<DocBookings />} />
      </Route> */}
    </Routes>
  );
};

export default App;
