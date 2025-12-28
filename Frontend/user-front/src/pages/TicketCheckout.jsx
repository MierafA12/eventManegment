import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const tx_ref = params.get("tx_ref");
  const [status, setStatus] = useState("Processing payment...");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!tx_ref) {
      setStatus("No transaction reference found.");
      return;
    }

    fetch(`http://localhost/EthioEvents/Backend/public/chapa/verify.php?tx_ref=${tx_ref}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setStatus("Payment Successful!");
          setData(data.data); // store transaction data
        } else {
          setStatus("Payment Failed. Please try again.");
          setData(data.data || null);
        }
      })
      .catch(err => {
        console.error("VERIFY ERROR:", err);
        setStatus("Error verifying payment. Try again later.");
      });
  }, [tx_ref]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-bgDark p-6">
        <h1 className="text-2xl font-bold text-primary dark:text-text1">{status}</h1>
      </div>
    );
  }

  const isOnline = data.mode === "online" || data.type === "online"; // adjust based on your event type field

  return (
    <div className="flex flex-col items-center min-h-screen bg-lightBg dark:bg-bgDark p-6">
      <div className="bg-bg dark:bg-bgDark shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-success">{status}</h1>

        <div className="mb-4">
          <p><span className="font-semibold">Name:</span> {data.first_name} {data.last_name}</p>
          <p><span className="font-semibold">Email:</span> {data.email}</p>
          {data.phone_number && <p><span className="font-semibold">Phone:</span> {data.phone_number}</p>}
        </div>

        <div className="mb-4">
          <p><span className="font-semibold">Amount Paid:</span> {data.amount} {data.currency}</p>
          <p><span className="font-semibold">Transaction Reference:</span> {data.reference}</p>
          <p><span className="font-semibold">Payment Method:</span> {data.method}</p>
          <p><span className="font-semibold">Date:</span> {new Date(data.created_at).toLocaleString()}</p>
        </div>

        {isOnline ? (
          <div className="mt-4 p-4 bg-secondary text-text1 rounded-lg">
            <p className="font-semibold">Online Event Link:</p>
            <a href={data.customization?.link || "#"} className="underline" target="_blank" rel="noopener noreferrer">
              {data.customization?.link || "No link available"}
            </a>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-primary text-text1 rounded-lg">
            <p className="font-semibold">Your Ticket ID:</p>
            <span className="text-lg">{data.tx_ref}</span>
          </div>
        )}

      </div>
    </div>
  );
}
