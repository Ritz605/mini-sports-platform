import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Must include at least one uppercase letter";
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = "Must include at least one lowercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Must include at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Remove error as user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
  const message = err.response?.data?.message;
  const field = err.response?.data?.field;

  if (field) {
    // Map backend error to field
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  } else {
    setServerError(message || "Registration failed");
  }
}
finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Please enter your details to create an account."
    >
      {serverError && (
        <p className="text-red-500 text-sm text-center mb-3">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1
              ${errors.name ? "border-red-500" : "focus:ring-black"}`}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1
              ${errors.email ? "border-red-500" : "focus:ring-black"}`}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1
              ${errors.password ? "border-red-500" : "focus:ring-black"}`}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-b from-gray-800 to-black hover:opacity-90 transition"
        >
          {loading ? "Creating account..." : "Create an account"}
        </button>
      </form>

      <div className="mt-6 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-black">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
