

import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  Date: {
    type: Date,
    default: () =>
      new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }),
  },
  name: String,
  department: String,
  school: String,
  program: String,
  yearOfStudy: Number,
  regNumber: String,
  location: String,
  hash: String,
  requestId: String,
  status: {
    type: String,
    enum: ["Active", "Suspended"],
    default: "Active",
  },
});

export const cardModel = mongoose.model("card", cardSchema);
