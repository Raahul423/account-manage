import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser ? <Navigate to="/account" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={
          currentUser ? <Navigate to="/account" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          currentUser ? <Navigate to="/account" replace /> : <Register />
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
