import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChair,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (!showOTP) {
        await api.post("/bookings/send-otp");
        setShowOTP(true);
        setSuccessMsg("OTP sent to your email. Please verify to confirm booking.");
      } else {
        await api.post("/bookings", { eventId: event._id, otp });
        setSuccessMsg("Booking requested! Awaiting admin confirmation.");
        setShowOTP(false);
        setEvent({ ...event, availableSeats: event.availableSeats - 1 });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel-strong rounded-[2rem] px-6 py-16 text-center text-lg font-semibold text-slate-100">
        Loading...
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="glass-panel-strong rounded-[2rem] px-6 py-16 text-center text-lg text-red-200">
        {error || "Event not found"}
      </div>
    );
  }

  const isSoldOut = event.availableSeats <= 0;

  return (
    <div className="page-fade-in grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="neo-card glass-panel-strong overflow-hidden border-white/10">
        <div className="relative h-80 overflow-hidden md:h-[26rem]">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-5xl font-black uppercase tracking-[0.4em] text-slate-300">
              {event.category}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute left-6 top-6 pill-tag border-white/10 bg-black/30 text-white">
            {event.category}
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="neon-title max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
              {event.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200/90 md:text-base">
              {event.description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="glass-panel rounded-[1.5rem] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <FaMoneyBillWave />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Ticket Price
            </p>
            <p className="mt-2 text-xl font-extrabold text-white">
              {event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`}
            </p>
          </div>
          <div className="glass-panel rounded-[1.5rem] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-300/10 text-violet-200">
              <FaChair />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Availability
            </p>
            <p className="mt-2 text-xl font-extrabold text-white">
              <span className={event.availableSeats < 10 ? "text-orange-300" : ""}>
                {event.availableSeats}
              </span>{" "}
              / {event.totalSeats}
            </p>
          </div>
          <div className="glass-panel rounded-[1.5rem] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
              <FaCalendarAlt />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Date
            </p>
            <p className="mt-2 text-xl font-extrabold text-white">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="glass-panel rounded-[1.5rem] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-300/10 text-rose-200">
              <FaMapMarkerAlt />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Location
            </p>
            <p className="mt-2 text-xl font-extrabold text-white">
              {event.location}
            </p>
          </div>
        </div>
      </section>

      <aside className="neo-card glass-panel-strong h-fit border-white/10 p-6 md:p-8 lg:sticky lg:top-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="pill-tag mb-3 w-fit border-white/10 bg-white/5">
              Booking
            </p>
            <h2 className="text-2xl font-extrabold text-white">Reserve your seat</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right">
            <p className="text-xs text-slate-400">Seats left</p>
            <p className="text-lg font-bold text-white">{event.availableSeats}</p>
          </div>
        </div>

        <div className="space-y-4">
          {showOTP && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Enter OTP to Confirm
              </label>
              <input
                type="text"
                required
                placeholder="6-digit code"
                className="frost-input text-center text-lg font-bold tracking-[0.4em]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
            className={`frost-button w-full px-6 py-4 text-base ${
              isSoldOut || (successMsg && !showOTP)
                ? "cursor-not-allowed bg-white/10 text-slate-400"
                : ""
            }`}
          >
            {bookingLoading ? (
              "Processing..."
            ) : showOTP ? (
              <>
                Verify OTP & Confirm <FaArrowRight />
              </>
            ) : successMsg && !showOTP ? (
              "Request Sent"
            ) : isSoldOut ? (
              "Sold Out"
            ) : (
              "Confirm Registration"
            )}
          </button>

          {error && (
            <p className="rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-center text-sm font-medium text-red-100">
              {error}
            </p>
          )}

          {successMsg && (
            <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-center text-sm font-medium text-emerald-100">
              {successMsg}
            </p>
          )}

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
            The same OTP booking flow is preserved. The interface simply adds
            depth, glow, and motion around it.
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EventDetail;
