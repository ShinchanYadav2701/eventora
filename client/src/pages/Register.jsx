import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!showOTP) {
        await register(name, email, password);
        setShowOTP(true);
        setError("");
      } else {
        await verifyOTP(email, otp);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <section className="glass-panel-strong neo-card order-2 overflow-hidden border-white/10 p-6 sm:p-8 lg:order-1">
        <div className="mb-8 text-center">
          <p className="pill-tag mx-auto mb-4 w-fit border-violet-300/20 bg-violet-300/10 text-violet-100">
            Create account
          </p>
          <h2 className="neon-title text-3xl font-extrabold text-white sm:text-4xl">
            Join the immersive flow
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Sign up once, then verify with OTP to unlock bookings and your
            dashboard.
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="frost-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
            <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="mb-4 text-sm text-emerald-100">
                An OTP has been sent to your email. Please verify your account.
              </p>
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
            {loading ? "Processing..." : showOTP ? "Verify & Complete" : "Sign Up"}
            <FaArrowRight className="text-xs" />
          </button>
        </form>

        {!showOTP && (
          <p className="mt-8 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-cyan-200 hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </section>

      <section className="glass-panel-strong neo-card order-1 hidden min-h-full overflow-hidden border-white/10 p-8 lg:order-2 lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="pill-tag mb-5 w-fit border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            Onboarding
          </p>
          <h1 className="neon-title text-5xl font-extrabold leading-[0.94] text-white">
            A brighter way to
            <span className="block bg-gradient-to-r from-cyan-200 via-white to-violet-300 bg-clip-text text-transparent">
              enter the platform.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            The same sign-up flow is preserved, but the page now feels like a
            polished app shell instead of a plain form.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <FaUserPlus className="text-2xl text-cyan-200" />
            <p className="mt-4 text-sm text-slate-300">
              New users can complete registration and OTP verification in one flow.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <FaUser className="text-2xl text-violet-200" />
            <p className="mt-4 text-sm text-slate-300">
              Returning users can switch over to login without losing the visual theme.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <FaEnvelope className="text-2xl text-emerald-200" />
            <p className="mt-4 text-sm text-slate-300">
              OTP confirmation still relies on email as before.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <FaLock className="text-2xl text-rose-200" />
            <p className="mt-4 text-sm text-slate-300">
              Password handling and token storage remain unchanged.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
