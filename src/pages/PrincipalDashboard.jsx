import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is imported

function PrincipalDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newNews, setNewNews] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setLoading(false);
      fetchData();
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [usersResponse, announcementsResponse, eventsResponse, newsResponse] = await Promise.all([
        axios.get("/api/users/count"),
        axios.get("/api/announcements"),
        axios.get("/api/events"),
        axios.get("/api/news")
      ]);

      setStats(usersResponse.data);
      setAnnouncements(announcementsResponse.data);
      setEvents(eventsResponse.data);
      setNews(newsResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/announcements", { message: newAnnouncement });
      setAnnouncements([...announcements, response.data]);
      setNewAnnouncement("");
    } catch (error) {
      console.error("Error adding announcement", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/events", {
        title: newEventTitle,
        description: newEventDescription,
        date: newEventDate,
        time: newEventTime
      });
      setEvents([...events, response.data]);
      setNewEventTitle("");
      setNewEventDescription("");
      setNewEventDate("");
      setNewEventTime("");
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/news", { title: newNews });
      setNews([...news, response.data]);
      setNewNews("");
    } catch (error) {
      console.error("Error adding news", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black fitScreen text-white  p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-black border border-gray-800 rounded shadow">
            <h2 className="text-xl font-bold">Total Registered Users</h2>
            <p>{stats.totalUsers || "00"}</p>
          </div>

          <div className="p-4 bg-black border border-gray-800 rounded shadow">
            <h2 className="text-xl font-bold">Announcements</h2>
            <ul>
              {/* {announcements.map(announcement => (
                <li key={announcement.id} className="py-1">{announcement.message}</li>
              ))} */}
            </ul>
            <form onSubmit={handleAddAnnouncement} className="mt-4">
              <input
                type="text"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="New Announcement"
                className="w-full p-2 border-none outline-none rounded bg-gray-900 text-white"
              />
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Post Announcement</button>
            </form>
          </div>

          <div className="p-4 bg-black border border-gray-800 rounded shadow">
            <h2 className="text-xl font-bold">Events</h2>
            <ul>
              {/* {events.map(event => (
                <li key={event.id} className="py-1">
                  <strong>{event.title}</strong><br/>
                  {event.description}<br/>
                  {event.date} at {event.time}
                </li>
              ))} */}
            </ul>
            <form onSubmit={handleAddEvent} className="mt-4">
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Event Title"
                className="w-full p-2 mb-2 border-none outline-none rounded bg-gray-900 text-white"
              />
              <input
                type="text"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                placeholder="Event Description"
                className="w-full p-2 mb-2 border-none outline-none rounded bg-gray-900 text-white"
              />
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full p-2 mb-2 border-none outline-none rounded bg-gray-900 text-white"
              />
              <input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="w-full p-2 mb-2 border-none outline-none rounded bg-gray-900 text-white"
              />
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Add Event</button>
            </form>
          </div>

          <div className="p-4 bg-black border border-gray-800 rounded shadow">
            <h2 className="text-xl font-bold">News</h2>
            <ul>
              {/* {news.map(item => (
                <li key={item.id} className="py-1">{item.title}</li>
              ))} */}
            </ul>
            <form onSubmit={handleAddNews} className="mt-4">
              <input
                type="text"
                value={newNews}
                onChange={(e) => setNewNews(e.target.value)}
                placeholder="Title"
                className="w-full mb-4 p-2 border-none outline-none rounded bg-gray-900 text-white"
              />
              <input
                type="text"
                value={newNews}
                onChange={(e) => setNewNews(e.target.value)}
                placeholder="New News"
                className="w-full p-2 mb-1 border-none outline-none rounded bg-gray-900 text-white"
              />
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Post News</button>
            </form>
          </div>

          {/* Add more sections here as needed */}
        </div>
      </div>
    </div>
  );
}

export default PrincipalDashboard;
