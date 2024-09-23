import { Navigate, Outlet } from 'react-router-dom';
import { checkToken, getRole } from '../../utils/localFunctions';

const PrivateRoute = props => {
  return checkToken() && props.role == getRole() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
