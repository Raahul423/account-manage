import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "./Button.jsx";

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black via-slate-900 to-slate-950">

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6">
       
        <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur">
          <Link to="/" className="flex items-center gap-2">
            <div>
              <div className="text-sm font-semibold text-slate-50">
                Account Manager
              </div>
              
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            {currentUser ? (
              <>
                <span className="hidden text-slate-300 sm:inline">
                  Logged in as{" "}
                  <span className="font-medium text-indigo-300">
                    {currentUser.name}
                  </span>
                </span>
                <Link
                  to="/account"
                  className="rounded-md border border-slate-700 px-3 py-2 text-slate-200 hover:border-indigo-500 hover:text-indigo-300"
                >
                  My Account
                </Link>
                <Button onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md border border-slate-700 px-3 py-2 text-slate-200 hover:border-indigo-500 hover:text-indigo-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-slate-100 px-3 py-2 text-slate-900 hover:bg-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main card */}
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-xl shadow-black/40 backdrop-blur">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
