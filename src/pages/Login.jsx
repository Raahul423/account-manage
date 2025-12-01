import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setGlobalError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.password.trim()) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 400)); // small fake delay
      login(form);
      navigate("/account");
    } catch (err) {
      setGlobalError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="mb-6 space-y-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-slate-50">Welcome Back</h1>
        <p className="text-sm text-slate-400">
        Sign in to your account
        </p>
      </div>

      {globalError && (
        <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          className="text-white"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
           className="text-white"
        />

        <Button type="submit" disabled={loading} className="w-full mt-2 text-white">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-300 hover:text-indigo-200"
        >
          Sign up
        </Link>
      </p>
    </Layout>
  );
};

export default Login;
