import { NextResponse } from "next/server";
import { uuid } from "uuidv4";
import midtransClient from "midtrans-client";
import { TransactionModel } from "@/db/models/transaction";
import { ObjectId } from "mongodb";
import axios from "axios";
import { EventModel } from "@/db/models/event";

export async function POST(request) {
  try {
    const { eventId, tickets, amount } = await request.json();
    const order_id = uuid();

    const userEmail = request.headers.get("x-email-user");
    const userId = request.headers.get("x-id-user");

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: userEmail,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    const ticketsArray = [];

    Object.entries(tickets).forEach(([key, value]) => {
      const array = Array.from({ length: value }, () => ({
        ticketId: uuid(),
        type: key,
      }));

      ticketsArray.push(...array);
    });

    await TransactionModel.createTransaction({
      orderId: order_id,
      userId: new ObjectId(String(userId)),
      eventId: new ObjectId(String(eventId)),
      transactionToken,
      tickets: ticketsArray,
      paidStatus: false,
      paidDate: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    image.png;
    await EventModel.decrementEventTickets(eventId, tickets);

    console.log("masuk post & created the order");
    return NextResponse.json({ orderId: order_id, transactionToken });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request) {
  try {
    const { orderId } = await request.json();

    const order = await TransactionModel.findByOrderId(orderId);
    // console.log(order, "<order dari database by orderId");
    if (!order) throw { name: "OrderNotFound" };
    console.log(
      typeof orderId,
      typeof order.orderId.toString(),
      "<<<comparing id user"
    );
    if (orderId !== order.orderId.toString()) throw { name: "Forbidden" };
    if (order.paidStatus === true) throw { name: "AlreadyPaid" };
    // console.log("PASSED VALIDATION.");
    const serverKey = process.env.MIDTRANS_SERVER_KEY.toString("base64");
    const serverKeyBase64 = Buffer.from(serverKey + ":").toString("base64");

    const { data } = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Authorization: "Basic " + serverKeyBase64,
        },
      }
    );

    console.log(data.status_code, data.transaction_status, "hasil axios");

    if (data.status_code === "200" && data.transaction_status === "capture") {
      await TransactionModel.updateOrderById(orderId);
      console.log("Updated transaction");
    } else {
      throw { name: "MidtransError" };
    }

    // const order2 = await TransactionModel.findByOrderId(orderId);
    // console.log(order2, "<<<<<<<<<<<<<<<<<<the order new");

    return NextResponse.json({ message: "Transaction success" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
