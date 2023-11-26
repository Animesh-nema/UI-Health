import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import './App.css';
import Login from './pages/login/login';
import AuthService from './services/AuthService';
import NurseList from './pages/admin/Nurse/nurses';
import NurseUpdate from './pages/admin/Nurse/updateNurse';
import ViewNurse from './pages/admin/Nurse/viewNurse';
import AdminHome from './pages/admin/adminHome';
import RegisterNurse from './pages/admin/Nurse/CreateNurse';
import VaccineList from './pages/admin/Vaccine';
import AddVaccine from './pages/admin/Vaccine/addVaccine';
import Patients from './pages/admin/patient/allPatient';
import ViewPatient from './pages/admin/patient/viewPatient';
import { ADMIN, NURSE } from './role';

const { Header, Content } = Layout;

const App = () => {
  const [user, setUser] = useState(AuthService.getUser());

  const handleLogin = async (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    const storedUser = AuthService.getUser();
    if (!user && storedUser) {
      setUser(storedUser);
    }
  }, [user]);

  const isAuthenticated = !!user;
  const isAdmin = user?.role_id === ADMIN;
  const isNurse = user?.role_id === NURSE;

  return (
    <Router>
    <Layout className="full-height">
        <Header className="header">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <>
                  <Link to="/admin">Admin Dashboard</Link>
                  <Link to="/admin/profile">Admin Profile</Link>
                  <Link to="/admin/settings">Admin Settings</Link>
                </>
              )}
              {isNurse && (
                <>
                  <Link to="/user">User Dashboard</Link>
                  <Link to="/user/profile">User Profile</Link>
                  <Link to="/user/settings">User Settings</Link>
                </>
              )}
              <Button type="link" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Header>
        <Content className="content">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
            {isAdmin && (
              <>
                <Route path="/admin/nurse" element={<NurseList/>} />
                <Route path="/admin/update-nurse/:id" element={<NurseUpdate/>} />
                <Route path="/admin/nurse/:id" element={<ViewNurse/>} />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/create/nurse" element={<RegisterNurse/>} />
                <Route path="/admin/create/vaccine" element={<AddVaccine/>} />
                <Route path="/admin/vaccines" element={<VaccineList/>} />
                <Route path="/admin/patients" element={<Patients/>} />
                <Route path="/admin/patient/:patientId" element={<ViewPatient/>} />

                {/* <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/settings" element={<AdminSettings />} /> */}
              </>
            )}
            {isNurse && (
              <>
                {/* <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/user/settings" element={<UserSettings />} /> */}
              </>
            )}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
