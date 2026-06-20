import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
  FaChevronRight,
} from "react-icons/fa";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events?search=${search}`);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in space-y-10">
      <section className="neo-card glass-panel-strong hero-ribbon overflow-hidden rounded-[2.5rem] border-white/10 px-6 py-8 md:px-10 md:py-12 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <span className="pill-tag w-fit border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Welcome to EventHora
            </span>

            <div className="space-y-5">
              <h1 className="neon-title max-w-3xl text-5xl font-extrabold leading-[0.94] text-white sm:text-6xl lg:text-7xl">
                Discover events that feel
                <span className="block bg-gradient-to-r from-cyan-200 via-white to-violet-300 bg-clip-text text-transparent">
                  cinematic
                </span>
                from the first click.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Browse live events, book in a flash, and step into a smooth
                immersive experience that keeps the same workflow you already
                use.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="glass-panel float-delay-1 page-fade-in rounded-[1.5rem] p-4">
                <FaRegClock className="mb-3 text-2xl text-cyan-200" />
                <h3 className="mb-1 font-bold text-white">Fast Booking</h3>
                <p className="text-sm text-slate-300">
                  Move from discovery to checkout in just a few taps.
                </p>
              </div>
              <div className="glass-panel float-delay-2 page-fade-in rounded-[1.5rem] p-4">
                <FaTicketAlt className="mb-3 text-2xl text-violet-200" />
                <h3 className="mb-1 font-bold text-white">Seamless Access</h3>
                <p className="text-sm text-slate-300">
                  Track your bookings from the dashboard without losing context.
                </p>
              </div>
              <div className="glass-panel float-delay-3 page-fade-in rounded-[1.5rem] p-4">
                <FaShieldAlt className="mb-3 text-2xl text-emerald-200" />
                <h3 className="mb-1 font-bold text-white">Secure Platform</h3>
                <p className="text-sm text-slate-300">
                  OTP verification and account-based access stay in place.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-400/20 blur-2xl" />
            <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/60">
                    Live discovery
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold text-white">
                    Search the skyline
                  </h2>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right">
                  <p className="text-xs text-slate-400">Results</p>
                  <p className="text-lg font-bold text-white">{events.length}</p>
                </div>
              </div>

              <div className="relative">
                <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events by title..."
                  className="frost-input pl-12 pr-4 text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Instant
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-white">3D</p>
                  <p className="mt-1 text-sm text-slate-300">Animated shell</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-300">
                    Status
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-white">Live</p>
                  <p className="mt-1 text-sm text-slate-200">Booking ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="pill-tag mb-3 w-fit border-white/10 bg-white/5">
              Curated lineup
            </p>
            <h2 className="neon-title text-3xl font-extrabold text-white sm:text-4xl">
              Upcoming Events
            </h2>
          </div>
          <div className="text-sm font-medium text-slate-300">
            {events.length} results found
          </div>
        </div>

        {loading ? (
          <div className="glass-panel rounded-[2rem] px-6 py-16 text-center text-lg font-semibold text-slate-200">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="glass-panel rounded-[2rem] px-6 py-16 text-center text-lg text-slate-300">
            No events found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="neo-card glass-panel-strong flex min-h-[100%] flex-col border-white/10"
              >
                <div className="relative h-52 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-3xl font-black uppercase tracking-[0.28em] text-slate-300">
                      {event.category || "Event"}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute left-4 top-4 pill-tag border-white/10 bg-black/35 text-white">
                    {event.category || "Featured"}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/90 px-3 py-1 text-sm font-extrabold text-slate-950 shadow-lg">
                    {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-extrabold text-white">
                    {event.title}
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200">
                        <FaCalendarAlt />
                      </span>
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-200">
                        <FaMapMarkerAlt />
                      </span>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                        style={{
                          width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      {event.availableSeats} of {event.totalSeats} seats remaining
                    </p>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="frost-button mt-6 w-full px-4 py-3 text-sm"
                  >
                    View Details
                    <FaChevronRight className="text-xs" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="glass-panel mt-8 rounded-[2rem] px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
            <FaTicketAlt />
          </span>
          <span className="text-xl font-extrabold text-white">EventHora</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          The simplest, most dynamic way to manage, discover, and host
          world-class events in your city.
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.28em] text-slate-400">
          &copy; {new Date().getFullYear()} EventHora Platform
        </p>
      </footer>
    </div>
  );
};

export default Home;
