"use client";
import { createTransaction, payTransaction } from "@/actions/payment";
import { getEventDetails } from "../page";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function EventBuyTicketPage({ params }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: parseInt(value, 10),
    }));
  }

  const handleIncrement = (name) => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: (parseInt(prevInput[name]) || 0) + 1,
    }));
  };

  const handleDecrement = (name) => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: Math.max((parseInt(prevInput[name]) || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      let totalPrice = 0;
      data.tickets.forEach((ticket) => {
        totalPrice += (input[ticket.ticketId] || 0) * ticket.price;
      });
      setTotalPrice(totalPrice);
    }
  }, [input, data, loading]);

  const fetchData = async () => {
    const res = await getEventDetails(params.slug);
    setData(res);
    setLoading(false);
  };

  const handlePayButton = async (e) => {
    e.preventDefault();
    console.log("clicked", input, totalPrice);
    const response = await createTransaction(input, totalPrice, data._id);

    console.log(response.transactionToken, "<<< transaction token");
    console.log("test");

    window.snap.pay(response.transactionToken, {
      onSuccess: function (result) {
        //fetch patch
        payTransaction(response.orderId);
      },
    });
  };

  console.log(input);

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_SERVER_KEY}
        onLoad={() => {
          console.log("Script has loaded");
        }}
      />

      <main>
        <div>Ini event buy ticket page page</div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <form action="" className="flex flex-col">
                {data.tickets.map((x, i) => {
                  return (
                    <>
                      <input
                        type="number"
                        className="text-black boerder-lg"
                        name={x.ticketId}
                        onChange={inputHandler}
                        value={input[x.ticketId] || 0}
                      />
                      <span>
                        price: {x.price}, stock : {x.stock}
                      </span>
                      <div>
                        <div
                          onClick={() => handleDecrement(x.ticketId)}
                          disabled={input[x.ticketId] <= 0}
                          className="hover:bg-sky-500 hover:cursor-pointer"
                        >
                          decrement
                        </div>
                        <div
                          onClick={() => {
                            handleIncrement(x.ticketId);
                          }}
                          className="hover:bg-sky-500 hover:cursor-pointer"
                        >
                          increment
                        </div>
                      </div>
                    </>
                  );
                })}
                <div>total price : {totalPrice}</div>
                <button
                  className="bg-blue-200"
                  type="submit"
                  onClick={handlePayButton}
                  disabled={totalPrice === 0}
                >
                  Pay
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
}
