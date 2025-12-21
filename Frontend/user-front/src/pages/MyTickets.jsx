import { useEffect, useState } from "react";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import { Ticket, Calendar, MapPin, User, Mail, QrCode, Download } from "lucide-react";
import Header from "../component/Header.jsx";

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost/EthioEvents/Backend/public/get_user_tickets.php?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Tickets data:", data); // Debug
        
        if (data.status === "success") {
          // Process the data to flatten attendees
          const processedTickets = [];
          data.data.forEach(ticketGroup => {
            if (ticketGroup.attendees && ticketGroup.attendees.length > 0) {
              // Create separate entries for each attendee
              ticketGroup.attendees.forEach(attendee => {
                processedTickets.push({
                  event_title: ticketGroup.event_title,
                  event_date: ticketGroup.event_date,
                  event_time: ticketGroup.event_time,
                  event_type: ticketGroup.event_type,
                  event_link: ticketGroup.event_link,
                  location: ticketGroup.location,
                  ticket_type: ticketGroup.ticket_type,
                  total_amount: ticketGroup.total_amount,
                  payment_status: ticketGroup.payment_status,
                  attendee_name: attendee.attendee_name,
                  attendee_email: attendee.attendee_email,
                  ticket_code: attendee.ticket_code,
                  issued_at: ticketGroup.issued_at,
                  qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(attendee.ticket_code)}`
                });
              });
            } else {
              // Fallback if no attendees array
              processedTickets.push({
                event_title: ticketGroup.event_title,
                event_date: ticketGroup.event_date,
                event_time: ticketGroup.event_time,
                event_type: ticketGroup.event_type,
                event_link: ticketGroup.event_link,
                location: ticketGroup.location,
                ticket_type: ticketGroup.ticket_type,
                total_amount: ticketGroup.total_amount,
                payment_status: ticketGroup.payment_status,
                attendee_name: user.full_name || user.username,
                attendee_email: user.email,
                ticket_code: ticketGroup.ticket_code,
                issued_at: ticketGroup.issued_at,
                qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketGroup.ticket_code)}`
              });
            }
          });
          
          setTickets(processedTickets);
        } else {
          setTickets([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tickets:", err);
        setTickets([]);
        setLoading(false);
      });
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleDownloadTicket = (ticket) => {
    const ticketData = `
      EVENT TICKET
      ============
      Event: ${ticket.event_title}
      Date: ${formatDate(ticket.event_date)}
      Time: ${ticket.event_time}
      Type: ${ticket.event_type}
      Location: ${ticket.location}
      
      ATTENDEE INFORMATION
      --------------------
      Name: ${ticket.attendee_name}
      Email: ${ticket.attendee_email}
      
      TICKET INFORMATION
      ------------------
      Ticket Code: ${ticket.ticket_code}
      Ticket Type: ${ticket.ticket_type}
      Payment Status: ${ticket.payment_status}
      
      IMPORTANT NOTES
      ---------------
      1. Present this ticket at entry
      2. Keep your ticket code secure
      3. Contact support for assistance
    `;
    
    const blob = new Blob([ticketData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket-${ticket.ticket_code}.txt`;
    a.click();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-lightBg pt-32">
        <Header />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Ticket className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Please log in to see your tickets</h1>
          <p className="text-secondary">You need to be logged in to view your purchased tickets</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-lightBg pt-32">
        <Header />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg">
      <Header />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">My Tickets</h1>
            <p className="text-secondary">
              {tickets.length === 0 
                ? "You haven't purchased any tickets yet" 
                : `You have ${tickets.length} ticket${tickets.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {tickets.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <Ticket className="h-20 w-20 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">No tickets found</h2>
              <p className="text-secondary mb-6">
                You haven't purchased any tickets yet. Browse events to get started!
              </p>
              <button
                onClick={() => window.location.href = "/events"}
                className="px-6 py-3 bg-primary text-white rounded-full hover:bg-buttonHover transition"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {tickets.map((ticket, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          ticket.event_type === "Physical" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {ticket.event_type === "Physical" ? "📍 In-Person" : "🌐 Online"}
                        </span>
                        <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          {ticket.payment_status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{ticket.total_amount} ETB</p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-3">{ticket.event_title}</h2>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(ticket.event_date)} {ticket.event_time && `at ${ticket.event_time}`}
                      </div>
                      {ticket.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {ticket.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Attendee Info */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Attendee
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium text-gray-800">{ticket.attendee_name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3" />
                          {ticket.attendee_email}
                        </p>
                      </div>
                    </div>

                    {/* Ticket Code */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Ticket Code</h3>
                      <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3">
                        <code className="font-mono font-bold text-lg tracking-wider">
                          {ticket.ticket_code}
                        </code>
                        <img 
                          src={ticket.qr_code} 
                          alt="QR Code" 
                          className="h-12 w-12 rounded"
                        />
                      </div>
                    </div>

                    {/* Online Event Link */}
                    {ticket.event_type === "Online" && ticket.event_link && (
                      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">Online Event</p>
                        <a
                          href={ticket.event_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 underline"
                        >
                          Click here to join the event
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadTicket(ticket)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                      
                      <button
                        onClick={() => window.open(ticket.qr_code, "_blank")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                      >
                        <QrCode className="h-4 w-4" />
                        View QR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}