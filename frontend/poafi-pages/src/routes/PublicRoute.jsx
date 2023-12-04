import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = () => {
    const { credential } = AuthContext();

    return (
        credential.userId ? <Navigate to="/dashboard" /> : <Outlet />
    )
}

export default PublicRoute
