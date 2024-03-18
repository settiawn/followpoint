import { ObjectId } from "mongodb";
import { db } from "../config";

const transactionDB = db.collection("Transactions");

export class TransactionModel {
  static async createTransaction(data) {
    try {
      await transactionDB.insertOne(data);
    } catch (error) {
      throw error;
    }
  }

  static async findByOrderId(orderId) {
    try {
      return await transactionDB.findOne({ orderId });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderById(orderId) {
    try {
      const data =  await transactionDB.findOne({ orderId });
      await transactionDB.updateOne(
        { _id: new ObjectId(String(data._id)) },
        { $set: { paidStatus: true, paidDate: new Date() } }
      );
    } catch (error) {
      throw error;
    }
  }
}
