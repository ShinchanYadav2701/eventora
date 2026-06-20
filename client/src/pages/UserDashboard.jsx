import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaTimesCircle, FaRegUserCircle, FaChevronRight } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking request?")) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };

  if (loading) {
    return (
      <div className="glass-panel-strong rounded-[2rem] px-6 py-16 text-center text-lg font-semibold text-slate-100">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="page-fade-in space-y-8">
      <section className="glass-panel-strong neo-card overflow-hidden border-white/10 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-cyan-300/20 to-violet-300/20 text-3xl font-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="pill-tag mb-3 w-fit border-white/10 bg-white/5">
              User dashboard
            </p>
            <h1 className="neon-title text-3xl font-extrabold text-white sm:text-4xl">
              Welcome, {user?.name}!
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Your bookings, status, and account activity live here.
            </p>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
            <FaTicketAlt />
          </span>
          My booking requests
        </h2>
        <span className="pill-tag border-white/10 bg-white/5">{bookings.length} total</span>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-panel-strong rounded-[2rem] p-10 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/5">
            <FaTicketAlt className="text-3xl text-slate-400" />
          </div>
          <p className="text-xl font-semibold text-white">
            You haven't booked any events yet.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Browse the event grid and reserve your first seat.
          </p>
          <Link to="/" className="frost-button mt-6 px-6 py-3">
            Browse Events <FaChevronRight className="text-xs" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="neo-card glass-panel-strong flex flex-col border-white/10"
            >
              <div className="flex-1 p-6">
                {booking.eventId ? (
                  <>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <h3 className="text-xl font-extrabold text-white">
                        {booking.eventId.title}
                      </h3>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`pill-tag border-white/10 ${booking.status === "confirmed" ? "bg-emerald-400/10 text-emerald-100" : booking.status === "cancelled" ? "bg-red-400/10 text-red-100" : "bg-amber-400/10 text-amber-100"}`}
                        >
                          {booking.status}
                        </span>
                        {booking.status !== "cancelled" && (
                          <span
                            className={`pill-tag border-white/10 ${booking.paymentStatus === "paid" ? "bg-cyan-400/10 text-cyan-100" : "bg-white/5 text-slate-200"}`}
                          >
                            {booking.paymentStatus.replace("_", " ")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-slate-300">
                      <p>
                        <span className="font-bold text-slate-100">Date:</span>{" "}
                        {new Date(booking.eventId.date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-bold text-slate-100">Amount:</span>{" "}
                        {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
                      </p>
                      <p>
                        <span className="font-bold text-slate-100">Requested:</span>{" "}
                        {new Date(booking.bookedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm italic text-red-200">
                    Event details unavailable (might have been deleted)
                  </p>
                )}
              </div>

              <div className="border-t border-white/10 bg-white/5 p-4">
                {booking.eventId && booking.status !== "cancelled" ? (
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      to={`/events/${booking.eventId._id}`}
                      className="text-sm font-bold text-cyan-200 hover:underline"
                    >
                      View Event
                    </Link>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-red-200 transition hover:text-red-100"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-sm text-slate-400">
                    Booking Cancelled
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
