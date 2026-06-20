import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="page-fade-in mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
      <div className="glass-panel-strong neo-card w-full border-white/10 p-8 text-center sm:p-10">
        <FaCheckCircle className="mx-auto text-7xl text-emerald-300 drop-shadow-[0_0_25px_rgba(110,231,183,0.35)]" />
        <p className="pill-tag mx-auto mt-6 w-fit border-emerald-300/20 bg-emerald-300/10 text-emerald-100">
          Payment complete
        </p>
        <h1 className="neon-title mt-4 text-4xl font-extrabold text-white sm:text-5xl">
          Booking confirmed
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">
          Your ticket has been booked successfully. A confirmation email has
          been sent to your registered email address.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link to="/dashboard" className="frost-button px-5 py-3">
            View My Tickets <FaChevronRight className="text-xs" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-extrabold text-white transition hover:bg-white/10"
          >
            Discover More Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
