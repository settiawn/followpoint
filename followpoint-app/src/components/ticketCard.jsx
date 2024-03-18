"use client";
import { useState } from "react";

export default function TicketCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="m-1 border-sky-100 border">
      <div>event name : {data.eventInfo.title}</div>
      <div>event date : {data.eventInfo.date}</div>
      <div>order id : {data.orderId}</div>
      <div>Transaction status: {data.paidStatus ? "paid" : "failed"}</div>

      <div
        className="hover:cursor-pointer hover:bg-slate-500"
        onClick={() => setShowDetails(!showDetails)}
      >
        Show ticket details
      </div>

      {showDetails && (
        <div className="bg-sky-200">
          {data.tickets.map((x, i) => (
            <div key={i}>
              <div>booking code: {x.ticketId}</div>
              <div>Ticket Type: {x.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
