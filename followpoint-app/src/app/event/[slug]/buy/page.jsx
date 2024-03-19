"use client";
import { createTransaction, payTransaction } from "@/actions/payment";
import { getEventDetails } from "../page";
import { useEffect, useState } from "react";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function EventBuyTicketPage({ params }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  function inputHandler(event) {
    const { name, value } = event.target;
    const inputValue = parseInt(value, 10);

    const ticket = data.tickets.find((ticket) => ticket.ticketId === name);

    if (ticket) {
      if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= ticket.stock) {
        setInput((prevInput) => ({
          ...prevInput,
          [name]: inputValue,
        }));
      } else {
        setInput((prevInput) => ({
          ...prevInput,
          [name]: prevInput[name] || 0,
        }));
      }
    }
  }

  const handleIncrement = (name) => {
    const ticket = data.tickets.find((ticket) => ticket.ticketId === name);
    if (ticket) {
      setInput((prevInput) => {
        const currentValue = parseInt(prevInput[name]) || 0;
        const newValue = currentValue + 1;
        if (newValue <= ticket.stock) {
          return {
            ...prevInput,
            [name]: newValue,
          };
        } else {
          return prevInput;
        }
      });
    }
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
    // console.log("clicked", input, totalPrice);
    const response = await createTransaction(input, totalPrice, data._id);

    // console.log(response.transactionToken, "<<< transaction token");
    // console.log("test");

    window.snap.pay(response.transactionToken, {
      onSuccess: function (result) {
        //fetch patch
        payTransaction(response.orderId, input, data._id);
      },
    });
  };

  // console.log(input);

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_SERVER_KEY}
      />

      <main className="flex flex-col min-h-screen mx-auto p-4 bg-[rgba(27,29,34,1)]">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Checkout</h1>
          {loading ? (
            <div className="text-white">Loading the tickets...</div>
          ) : (
            <form className="grid gap-4">
              {data.tickets.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="bg-black p-4 rounded-md w-1/2 h-auto"
                >
                  <div className="text-white mb-2">
                    <p className="mt-2 text-yellow-500">
                      Day: <p className="text-white mb-2">{ticket.name}</p>
                    </p>
                    <p className="text-yellow-500">
                      Stock: <p className="text-white mb-2">{ticket.stock}</p>
                    </p>
                    <p className="mt-5 text-yellow-500">
                      Price: <p className="text-white mb-2">{ticket.price}</p>
                    </p>
                  </div>
                  <div className="text-white">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <button
                              type="button"
                              className="px-3 py-1 mx-2 bg-slate-600 text-white rounded-lg"
                              onClick={() => handleDecrement(ticket.ticketId)}
                              disabled={input[ticket.ticketId] <= 0}
                            >
                              -
                            </button>
                          </td>
                          <td>
                            <input
                              type="number"
                              name={ticket.ticketId}
                              value={input[ticket.ticketId] || 0}
                              onChange={inputHandler}
                              className="text-black border-lg appearance-none w-14 py-2 px-3 leading-tight focus:outline-none flex-grow"
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="px-3 py-1 mx-2 bg-slate-600 text-white rounded-lg"
                              onClick={() => handleIncrement(ticket.ticketId)}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <div className="text-white">Total Price: {totalPrice}</div>
              <button
                type="submit"
                className="bg-yellow-500 text-black py-2 px-4 mt-4 rounded-md w-48 h-12"
                onClick={handlePayButton}
                disabled={totalPrice === 0}
              >
                Pay
              </button>
            </form>
          )}
        </div>
        <Footer className="footer" />
      </main>
    </>
  );
}
