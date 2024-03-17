import { db } from "../config";

const eventDB = db.collection("Events");

export class EventModel {
  static async getAllEvents() {
    try {
      return (await eventDB.find().toArray())
    } catch (error) {
      throw error;
    }
  }

  static async getEventBySlug(slug) {
    try {
        return (await eventDB.findOne({slug}))
    } catch (error) {
        throw error
    }
  }
}
