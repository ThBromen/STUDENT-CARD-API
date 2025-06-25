import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  Date: {
    type: Date,
    default: () =>
      new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
  },
  univercityName: String,
  location: String,
  phoneNumber: String,
  email: String,
});

export const University = mongoose.model("University", universitySchema);
