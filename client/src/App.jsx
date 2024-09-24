import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import HostHome from './Pages/HostHome/HostHome';
import HostGetaways from './Pages/HostGetaways/HostGetaways';
import HostProfile from './Pages/HostProfile/HostProfile';
import EditGetaway from './Pages/EditGetaway/EditGetaway';
import AddGetaway from './Pages/AddGetaway/AddGetaway';
import UserSignup from './Pages/UserSignup/UserSignup';
import UserLogin from './Pages/UserLogin/UserLogin';
import UserHome from './Pages/UserHome/UserHome';
import UserGetaways from './Pages/UserGetaways/UserGetaways';
import UserProfile from './Pages/UserProfile/UserProfile';
import GetawayDetails from './Pages/GetawayDetails/GetawayDetails';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/host/login" element={<Login />} />
      <Route path="/host/signup" element={<Signup />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route element={<PrivateRoute role="HOST" />}>
        <Route path="/host/home" element={<HostHome />} />
        <Route path="/host/getaways" element={<HostGetaways />} />
        <Route path="/host/getaways/:id" element={<EditGetaway />} />
        <Route path="/host/getaways/add" element={<AddGetaway />} />
        <Route path="/host/profile" element={<HostProfile />} />
      </Route>
      <Route element={<PrivateRoute role="USER" />}>
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/getaways" element={<UserGetaways />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/getaways/:id" element={<GetawayDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
