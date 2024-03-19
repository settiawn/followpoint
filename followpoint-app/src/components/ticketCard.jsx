"use client";
import { useState } from "react";

export default function TicketCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="m-1 border-sky-100 border p-2">
      <div className="font-bold text-yellow-500 text-2xl">
        {data.eventInfo.title}
      </div>
      <div>{data.eventInfo.date}</div>
      <div>ORDER ID : {data.orderId}</div>
      <div>
        Transaction status:{" "}
        <span
          className={`${data.paidStatus ? "text-green-500" : "text-red-500"}`}
        >
          {data.paidStatus ? "paid" : "failed"}
        </span>
      </div>
      {data.paidStatus && (
        <div
          className={`hover:bg-slate-500 ${
            data.paidStatus ? "hover:cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={() => {
            if (data.paidStatus) setShowDetails(!showDetails);
          }}
        >
          Tickets ({data.tickets.length})
        </div>
      )}
      {showDetails && (
        <div className="p-1">
          {data.tickets.map((x, i) => (
            <div key={i} className="p-2 border m-1">
              <div>
                Day:{" "}
                {
                  data.eventInfo.tickets.find(
                    (ticket) => ticket.ticketId === x.type
                  )?.name
                }
              </div>
              <div>booking code: {x.ticketId}</div>
              <div>Ticket Type: {x.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
