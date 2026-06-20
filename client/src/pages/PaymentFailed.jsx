import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle, FaChevronRight } from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="page-fade-in mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
      <div className="glass-panel-strong neo-card w-full border-white/10 p-8 text-center sm:p-10">
        <FaTimesCircle className="mx-auto text-7xl text-rose-300 drop-shadow-[0_0_25px_rgba(251,113,133,0.35)]" />
        <p className="pill-tag mx-auto mt-6 w-fit border-rose-300/20 bg-rose-300/10 text-rose-100">
          Payment failed
        </p>
        <h1 className="neon-title mt-4 text-4xl font-extrabold text-white sm:text-5xl">
          Booking could not be completed
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">
          We couldn't process your payment. Please check your details and try
          again.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="frost-button px-5 py-3"
          >
            Return to Events <FaChevronRight className="text-xs" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-extrabold text-white transition hover:bg-white/10"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
