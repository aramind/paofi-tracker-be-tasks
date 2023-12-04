import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';
import Dashboard from './pages/dashboard/Dashboad';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {

  useEffect(() => {
    //update the application's title name
    document.title = import.meta.env.VITE_COMPANY_NAME || "Uplift Application";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" element={<Login />}></Route >
          <Route path="/register" element={<Register />}></Route >
        </Route>

        <Route path="*" element={<p>Page Not Found!</p>}></Route >

      </Routes >
    </BrowserRouter >
  )
}

export default App;
