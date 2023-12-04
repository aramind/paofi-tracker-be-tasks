import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { credential } = AuthContext();

    return (
        <>
            <h1>Dashboard</h1>
            {
                credential.firstName ? (
                    <p>Welcome Back, {credential?.firstName} | <Link to="/logout">Logout</Link></p>
                ) : (
                    <p>You are not authorized!, Please <Link to="/login">login here</Link></p>
                )
            }

        </>
    );
}

export default Dashboard;
