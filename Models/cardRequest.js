

import mongoose from "mongoose";

const cardRequestSchema = mongoose.Schema({
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
  photo: String,
  email: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

export const cardRequest = mongoose.model("cardRequest", cardRequestSchema);
