import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    totalSeats: "",
    ticketPrice: "",
    image: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        api.get("/events"),
        api.get("/bookings/my"),
      ]);
      setEvents(eventsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", formData);
      setShowEventForm(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        totalSeats: "",
        ticketPrice: "",
        image: "",
      });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        fetchData();
      } catch (error) {
        alert("Error deleting event");
      }
    }
  };

  const handleConfirmBooking = async (id, paymentStatus) => {
    try {
      await api.put(`/bookings/${id}/confirm`, { paymentStatus });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error confirming booking");
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Cancel this user's booking request?")) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };

  const revenue = bookings.reduce(
    (sum, b) =>
      b.paymentStatus === "paid" && b.status === "confirmed" ? sum + b.amount : sum,
    0,
  );

  const paidClients = new Set(
    bookings
      .filter((b) => b.paymentStatus === "paid" && b.status === "confirmed")
      .map((b) => b.userId?._id),
  ).size;

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  if (loading) {
    return (
      <div className="glass-panel-strong rounded-[2rem] px-6 py-16 text-center text-lg font-semibold text-slate-100">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="page-fade-in space-y-8">
      <section className="glass-panel-strong neo-card overflow-hidden border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="pill-tag mb-4 w-fit border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
              Control room
            </p>
            <h1 className="neon-title text-4xl font-extrabold text-white sm:text-5xl">
              Admin dashboard
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Manage events, review booking requests, and confirm payments from
              a more futuristic command surface.
            </p>
          </div>

          <button onClick={() => setShowEventForm(!showEventForm)} className="frost-button px-5 py-3">
            {showEventForm ? "Cancel Creation" : "+ Create New Event"}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="glass-panel-strong rounded-[1.75rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Total Revenue
              </p>
              <h3 className="mt-3 text-4xl font-extrabold text-emerald-200">
                ₹{revenue}
              </h3>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
              <FaMoneyBillWave />
            </span>
          </div>
        </div>

        <div className="glass-panel-strong rounded-[1.75rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Paid Clients
              </p>
              <h3 className="mt-3 text-4xl font-extrabold text-cyan-200">
                {paidClients}
              </h3>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
              <FaUsers />
            </span>
          </div>
        </div>

        <div className="glass-panel-strong rounded-[1.75rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Pending Requests
              </p>
              <h3 className="mt-3 text-4xl font-extrabold text-amber-200">
                {pendingCount}
              </h3>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-200">
              <FaClock />
            </span>
          </div>
        </div>
      </div>

      {showEventForm && (
        <section className="neo-card glass-panel-strong overflow-hidden border-white/10 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
              <FaPlus />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Create New Event
              </h2>
              <p className="text-sm text-slate-300">
                Add a new event to the booking grid.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateEvent} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              required
              type="text"
              placeholder="Event Title"
              className="frost-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Category (e.g., Tech, Music)"
              className="frost-input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <input
              required
              type="date"
              className="frost-input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Location"
              className="frost-input"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <input
              required
              type="number"
              placeholder="Total Seats"
              className="frost-input"
              value={formData.totalSeats}
              onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
            />
            <input
              required
              type="number"
              placeholder="Ticket Price (0 for free)"
              className="frost-input"
              value={formData.ticketPrice}
              onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
            />

            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Image URL (direct image link)"
                className="frost-input"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <textarea
              required
              placeholder="Event Description"
              className="frost-input min-h-32 md:col-span-2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <button type="submit" className="frost-button md:col-span-2 px-5 py-3">
              Publish Event
            </button>
          </form>
        </section>
      )}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                <FaChartLine />
              </span>
              All Events
            </h2>
            <span className="pill-tag border-white/10 bg-white/5">{events.length}</span>
          </div>
          <div className="glass-panel-strong overflow-hidden rounded-[1.75rem] border-white/10">
            <ul className="max-h-[640px] divide-y divide-white/10 overflow-y-auto">
              {events.length === 0 ? (
                <li className="p-6 text-center text-slate-300">
                  No events created yet.
                </li>
              ) : (
                events.map((event) => (
                  <li key={event._id} className="p-5 transition hover:bg-white/5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-lg font-extrabold text-white">
                          {event.title}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-300">
                          <span className="pill-tag border-white/10 bg-white/5">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="pill-tag border-white/10 bg-white/5">
                            {event.availableSeats}/{event.totalSeats} seats
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/80 hover:text-white"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-amber-200">
                <FaClock />
              </span>
              Booking Requests
            </h2>
            <span className="pill-tag border-white/10 bg-white/5">{bookings.length}</span>
          </div>
          <div className="glass-panel-strong overflow-hidden rounded-[1.75rem] border-white/10">
            <ul className="max-h-[640px] divide-y divide-white/10 overflow-y-auto">
              {bookings.length === 0 ? (
                <li className="p-6 text-center text-slate-300">No bookings yet.</li>
              ) : (
                bookings.map((booking) => (
                  <li
                    key={booking._id}
                    className={`border-l-4 p-6 transition hover:bg-white/5 ${booking.status === "pending" ? "border-l-amber-300" : booking.status === "confirmed" ? "border-l-emerald-300" : "border-l-rose-300"}`}
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h4 className="text-lg font-extrabold text-white">
                        {booking.eventId?.title || "Deleted Event"}
                      </h4>
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

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                      <p className="mb-2">
                        <span className="font-bold text-slate-100">User:</span>{" "}
                        {booking.userId?.name}{" "}
                        <span className="text-slate-400">
                          ({booking.userId?.email})
                        </span>
                      </p>
                      <p className="mb-2">
                        <span className="font-bold text-slate-100">Amount:</span>{" "}
                        {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
                      </p>
                      <p className="mb-2">
                        <span className="font-bold text-slate-100">Date:</span>{" "}
                        {new Date(booking.bookedAt).toLocaleString()}
                      </p>
                      {booking.eventId && (
                        <p>
                          <span className="font-bold text-slate-100">Seats:</span>{" "}
                          {booking.eventId.availableSeats} remaining of{" "}
                          {booking.eventId.totalSeats}
                        </p>
                      )}
                    </div>

                    {booking.status === "pending" && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleConfirmBooking(booking._id, "paid")}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-extrabold text-emerald-100 transition hover:bg-emerald-500/80 hover:text-white"
                        >
                          <FaCheckCircle /> Approve as Paid
                        </button>
                        <button
                          onClick={() => handleConfirmBooking(booking._id, "not_paid")}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-slate-100 transition hover:bg-white/15"
                        >
                          <FaCheckCircle /> Approve Undecided
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-extrabold text-red-100 transition hover:bg-red-500/80 hover:text-white"
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
