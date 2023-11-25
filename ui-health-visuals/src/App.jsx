import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Layout, Button } from 'antd';

// import Home from './Home';
// import Dashboard from './Dashboard';
// import AdminDashboard from './AdminDashboard';
// import UserDashboard from './UserDashboard';
// import UserProfile from './UserProfile';
// import AdminProfile from './AdminProfile';
// import AdminSettings from './AdminSettings';
// import UserSettings from './UserSettings';
import Login from './pages/login/login';
import AuthService from './services/AuthService';

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
  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <Router>
      <Layout>
        <Header>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <>
                  <Link to="/admin">Admin Dashboard</Link>
                  <Link to="/admin/profile">Admin Profile</Link>
                  <Link to="/admin/settings">Admin Settings</Link>
                </>
              )}
              {isUser && (
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
        <Content style={{ padding: '20px' }}>
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
            {isAdmin && (
              <>
                {/* <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/settings" element={<AdminSettings />} /> */}
              </>
            )}
            {isUser && (
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
