import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!showOTP) {
        const data = await login(email, password);
        if (data.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      } else {
        const data = await verifyOTP(email, otp);
        if (data.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      }
    } catch (err) {
      if (err.needsVerification) {
        setShowOTP(true);
        setError("Account not verified. A new OTP has been sent to your email.");
      } else {
        setError(err.message || err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <section className="glass-panel-strong neo-card hidden min-h-full overflow-hidden border-white/10 p-8 lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="pill-tag mb-5 w-fit border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            Sign in
          </p>
          <h1 className="neon-title text-5xl font-extrabold leading-[0.94] text-white">
            Step into the
            <span className="block bg-gradient-to-r from-cyan-200 via-white to-violet-300 bg-clip-text text-transparent">
              3D event console.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            The workflow is the same, but the presentation is now layered,
            cinematic, and easier on the eyes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <FaLock className="text-2xl text-cyan-200" />
            <p className="mt-4 text-sm text-slate-300">
              OTP verification and role-based login still work exactly the same.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <FaEnvelope className="text-2xl text-violet-200" />
            <p className="mt-4 text-sm text-slate-300">
              Secure email-driven access stays available for returning users.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-panel-strong neo-card mx-auto w-full max-w-xl border-white/10 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="pill-tag mx-auto mb-4 w-fit border-white/10 bg-white/5">
            Welcome back
          </p>
          <h2 className="neon-title text-3xl font-extrabold text-white sm:text-4xl">
            Login to EventHora
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Sign in to manage bookings, events, and your dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-center text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!showOTP ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="frost-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="frost-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Verification Code (OTP)
              </label>
              <input
                type="text"
                required
                placeholder="6-digit code"
                className="frost-input text-center text-lg font-bold tracking-[0.35em]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="frost-button w-full px-5 py-3.5">
            {loading ? "Processing..." : showOTP ? "Verify OTP & Log In" : "Sign In"}
            <FaArrowRight className="text-xs" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-300">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-cyan-200 hover:underline">
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
