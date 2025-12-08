const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    guest: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      required: false,
      default: [],
    },
    ticketTypes: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);


const EventModel = mongoose.model("Events", eventSchema);
module.exports = EventModel;