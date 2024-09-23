import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import HostHome from './Pages/HostHome/HostHome';
import HostGetaways from './Pages/HostGetaways/HostGetaways';
import HostProfile from './Pages/HostProfile/HostProfile';
import EditGetaway from './Pages/EditGetaway/EditGetaway';
import AddGetaway from './Pages/AddGetaway/AddGetaway';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute role="HOST" />}>
        <Route path="/host/home" element={<HostHome />} />
        <Route path="/host/getaways" element={<HostGetaways />} />
        <Route path="/host/getaways/:id" element={<EditGetaway />} />
        <Route path="/host/getaways/add" element={<AddGetaway />} />
        <Route path="/host/profile" element={<HostProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
