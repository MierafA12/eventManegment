import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import axios from "axios";
import Header from "../component/Header.jsx";

export default function EventRegister() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [attendees, setAttendees] = useState([
    { name: user?.name || "", email: user?.email || "" },
  ]);

  // Sample events
  const events = [
    { id: 1, title: "Addis Tech Summit 2025", price: 100 },
    { id: 2, title: "Ethio Music Festival", price: 50 },
  ];

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === parseInt(id));
    if (!foundEvent) {
      navigate("/events");
      return;
    }
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = [...attendees];
    newAttendees[index][field] = value;
    setAttendees(newAttendees);
  };

  const addAttendee = () => {
    setAttendees([...attendees, { name: "", email: "" }]);
  };

  const removeAttendee = (index) => {
    if (attendees.length === 1) return; // At least 1 ticket
    const newAttendees = attendees.filter((_, i) => i !== index);
    setAttendees(newAttendees);
  };

  const handleCheckout = async () => {
    // Check all names
    if (attendees.some((a) => !a.name)) {
      alert("Please enter name for all tickets.");
      return;
    }

    setCheckoutLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/EthioEvents/Backend/public/chapa/initiate",
        {
          amount: event.price * attendees.length,
          currency: "ETB",
          tx_ref: `event-${event.id}-${Date.now()}`,
          callback_url: `http://localhost:5173/events/${event.id}/success`,
          attendees, // send all attendee info
        }
      );

      if (response.data && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        alert("Failed to initiate payment. Try again.");
      }
    } catch (error) {
      console.error("Chapa Error:", error);
      alert("Payment initialization failed");
    }

    setCheckoutLoading(false);
  };

  if (loading) return <p className="text-center mt-32">Loading...</p>;

  return (
    <div>
        <Header />
    <section className="pt-32 pb-20 bg-lightBg">
      <div className="container mx-auto px-4 max-w-2xl bg-bg rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Register for {event.title}</h1>

        <div className="mb-6 space-y-4">
          {attendees.map((attendee, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={`Attendee ${index + 1} Name`}
                value={attendee.name}
                onChange={(e) => handleAttendeeChange(index, "name", e.target.value)}
                className="flex-1 px-4 py-3 border rounded-xl"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={attendee.email}
                onChange={(e) => handleAttendeeChange(index, "email", e.target.value)}
                className="flex-1 px-4 py-3 border rounded-xl"
              />
              {attendees.length > 1 && (
                <button
                  onClick={() => removeAttendee(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addAttendee}
            className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
          >
            Add Another Ticket
          </button>

          <p className="font-semibold mt-2">
            Total: {event.price * attendees.length} ETB
          </p>
        </div>

        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="w-full bg-primary text-text1 py-4 rounded-full font-semibold hover:bg-buttonHover transition"
        >
          {checkoutLoading ? "Redirecting..." : "Proceed to Checkout"}
        </button>
      </div>
    </section>
     </div>
  );
}
