import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../component/Header2.jsx"; // private header
import { UserContext } from "../context/userContext.jsx";

export default function PrivateEvent() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: `/private-events/${id}` } });
    } else {
      // Fetch the event by ID or filter from list
      const fetchedEvent = {/* fetch or static list */};
      setEvent(fetchedEvent);
    }
  }, [user, id, navigate]);

  if (!event) return null; // or a loading spinner

  return (
    <div>
      <Header2 />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p>{event.date} - {event.location}</p>
        <p>{event.category}</p>
        {/* other details */}
      </div>
    </div>
  );
}
