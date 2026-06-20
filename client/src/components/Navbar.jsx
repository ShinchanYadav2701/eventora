import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTicketAlt, FaCompass, FaLayerGroup } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="glass-panel-strong mx-auto max-w-7xl rounded-[1.75rem] border border-white/10 px-4 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg text-cyan-200 shadow-[0_10px_30px_rgba(94,242,214,0.18)]">
              <FaTicketAlt />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/70">
                Immersive bookings
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                EventHora
              </h1>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className={`pill-tag transition hover:-translate-y-0.5 ${isActive("/") ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : ""}`}
            >
              <FaCompass />
              Events
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className={`pill-tag transition hover:-translate-y-0.5 ${isActive("/dashboard") || isActive("/admin") ? "border-indigo-300/40 bg-indigo-300/10 text-white" : ""}`}
                >
                  <FaLayerGroup />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="frost-button px-4 py-2.5 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`pill-tag transition hover:-translate-y-0.5 ${isActive("/login") ? "border-violet-300/40 bg-violet-300/10 text-white" : ""}`}
                >
                  Login
                </Link>
                <Link to="/register" className="frost-button px-4 py-2.5 text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
