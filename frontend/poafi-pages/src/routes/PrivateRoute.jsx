import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { credential } = AuthContext();

    return (
        credential.userId ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute
