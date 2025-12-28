import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const tx_ref = params.get("tx_ref");
  const [status, setStatus] = useState("Processing payment...");
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tx_ref) return;

    fetch("http://localhost/EthioEvents/Backend/public/chapa/verify.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ tx_ref }),
})

      .then(res => res.json())
.then(data => {
  console.log("Chapa verify response:", data);
  if (data.status === "success") {
    setStatus("Payment Successful!");
    setTicketData(data);
    setTimeout(() => navigate("/my-tickets"), 5000);
  } else {
    console.warn("Payment verification failed:", data.message);
    setStatus("Payment Failed. Try again. " + (data.message || ""));
  }
})

      .catch(err=>{
        console.error("Verify error:", err);
        setStatus("Error verifying payment. Try again later.");
      });
  }, [tx_ref, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-bgDark p-6">
      <h1 className="text-2xl font-bold text-primary dark:text-text1 mb-4">{status}</h1>

      {ticketData && (
        <div className="bg-bg dark:bg-bgDark shadow-lg rounded-xl p-6 w-full max-w-md">
          {ticketData.ticket_code && (
            <div className="p-4 bg-primary text-text1 rounded-lg text-center mb-4">
              <p className="font-semibold">Your Ticket Code:</p>
              <span>{ticketData.ticket_code}</span>
            </div>
          )}
          {ticketData.event_link && (
            <div className="p-4 bg-secondary text-text1 rounded-lg text-center mb-4">
              <p className="font-semibold">Online Event Link:</p>
              <a href={ticketData.event_link} className="underline" target="_blank" rel="noopener noreferrer">
                Join Event
              </a>
            </div>
          )}
          <p className="text-center text-gray-700 dark:text-gray-300 mt-2">You will also find this in My Tickets page.</p>
        </div>
      )}
    </div>
  );
}
