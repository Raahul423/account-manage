import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "am_users";
const CURRENT_USER_KEY = "am_current_user";

function readUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readCurrentUser() {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function writeCurrentUser(user) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = readUsers();
    const storedCurrentUser = readCurrentUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(storedUsers);
    setCurrentUser(storedCurrentUser);
    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const exists = users.find((u) => u.email === email);
    if (exists) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // NOTE: Demo only. Don't store plain passwords in real apps.
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    writeUsers(updatedUsers);
    setCurrentUser(newUser);
    writeCurrentUser(newUser);
    return newUser;
  };

  const login = ({ email, password }) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }
    setCurrentUser(user);
    writeCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    writeCurrentUser(null);
  };

  const updateAccount = (data) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...data };
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    writeUsers(updatedUsers);
    writeCurrentUser(updatedUser);
  };

  const value = {
    users,
    currentUser,
    loading,
    register,
    login,
    logout,
    updateAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
