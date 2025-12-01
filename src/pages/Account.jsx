import React, { useState } from "react";
import Layout from "../components/Layout.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Account = () => {
    const { currentUser, updateAccount } = useAuth();
    const [form, setForm] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
    });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        setSuccessMsg("");
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setSaving(true);
        await new Promise((res) => setTimeout(res, 400));
        updateAccount({
            name: form.name.trim(),
            email: form.email.trim(),
        });
        setSaving(false);
        setSuccessMsg("Account updated successfully");
    };

    return (
        <Layout>
            <div className="mb-6 space-y-2">
                <h1 className="text-xl font-semibold text-slate-50">
                    Account settings ⚙️
                </h1>
                <p className="text-sm text-slate-400">
                    View and update your basic account information.
                </p>
            </div>

            {successMsg && (
                <div className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-200">
                    {successMsg}
                </div>
            )}

            <div className="mb-4 rounded-md border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Account summary
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                        <div className="text-slate-500">User ID</div>
                        <div className="font-mono text-[11px] text-slate-300">
                            {currentUser?.id}
                        </div>
                    </div>
                    <div>
                        <div className="text-slate-500">Email</div>
                        <div className="text-slate-200">{currentUser?.email}</div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    className="text-white"
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    className="text-white"
                />

                <Button type="submit" disabled={saving} className="w-full mt-2">
                    {saving ? "Saving..." : "Save changes"}
                </Button>
            </form>
        </Layout>
    );
};

export default Account;
