import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, Ticket, ArrowRight, Loader, AlertCircle } from "lucide-react";
import Header from "../component/Header.jsx";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const tx_ref = params.get("tx_ref");
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("We are verifying your payment with Chapa...");
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tx_ref) {
      setStatus("error");
      setMessage("Missing transaction reference.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch("http://localhost/EthioEvents/Backend/public/chapa/verify.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tx_ref }),
        });

        const data = await response.json();
        console.log("Chapa verify response:", data);

        if (data.status === "success") {
          setStatus("success");
          setMessage("Registration Successful!");
          setTicketData(data);
          // Auto redirect after 5 seconds
          const timer = setTimeout(() => navigate("/my-tickets"), 5000);
          return () => clearTimeout(timer);
        } else {
          setStatus("error");
          setMessage(data.message || "Payment verification failed. Please contact support.");
        }
      } catch (err) {
        console.error("Verify error:", err);
        setStatus("error");
        setMessage("Network error while verifying payment. Don't worry, your payment might still be processed.");
      }
    };

    verifyPayment();
  }, [tx_ref, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bgDark transition-colors duration-300">
      <Header />

      <div className="pt-32 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center border border-gray-100 dark:border-gray-700">

          {status === "verifying" && (
            <div className="py-10">
              <Loader className="h-16 w-16 text-primary animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-text1 mb-2">Verifying Payment</h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-6">
              <div className="bg-green-100 dark:bg-green-900/30 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-text1 mb-4">{message}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your tickets have been generated successfully! You can now view them in your dashboard.
              </p>

              {ticketData?.ticket_codes && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8 text-left border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-4 text-primary dark:text-secondary">
                    <Ticket size={20} />
                    <span className="font-semibold text-sm">BOOKING SUMMARY</span>
                  </div>
                  <div className="space-y-3">
                    {ticketData.ticket_codes.map((t, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-600 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-500 dark:text-gray-400">{t.attendee_name}</span>
                        <span className="font-mono font-bold dark:text-text1">{t.ticket_code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => navigate("/my-tickets")}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-buttonHover transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  Go to My Tickets
                  <ArrowRight size={20} />
                </button>

                <Link to="/" className="block text-gray-500 hover:text-primary transition font-medium">
                  Back to Home
                </Link>
              </div>

              <p className="mt-8 text-xs text-gray-400">
                Redirecting to My Tickets in 5 seconds...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="py-10">
              <div className="bg-red-100 dark:bg-red-900/30 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-text1 mb-4">Payment Verification Failed</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>

              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-800 dark:bg-gray-700 text-white py-4 rounded-xl font-bold text-lg transition"
                >
                  Retry Verification
                </button>

                <Link to="/contact" className="block text-primary hover:underline font-medium">
                  Contact Support
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
