"use client";
import { getEventDetails } from "../page";
import { useEffect, useState } from "react";

export default function EventBuyTicketPage({ params }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getEventDetails(params.slug);
      setData(res);
    };

    fetchData();
  }, []);
  return (
    <main>
      <div>Ini event buy ticket page page</div>
      <div>
        <form action="" className="flex flex-col">
          {data.tickets.map((x, i) => {
            return (
              <>
                <input type="number" />
                <label htmlFor="">{x[0]}</label>
                <span>
                  price: {x[1]}, stock : {x[2]}
                </span>
              </>
            );
          })}
        </form>
        <div className="hover:cursor-pointer hover:bg-slate-200">
          <button>Buy ticket //init midtrans</button>
        </div>
      </div>
    </main>
  );
}
