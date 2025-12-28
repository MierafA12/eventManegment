import React from "react";

export default function TicketCard({ type, price, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-xl p-5 cursor-pointer transition-all
        ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300"}
      `}
    >
      <h3 className="text-xl font-semibold mb-2">{type}</h3>
      <p className="text-gray-600 mb-3">
        Access to event
      </p>
      <p className="text-2xl font-bold">{price} ETB</p>
    </div>
  );
}
