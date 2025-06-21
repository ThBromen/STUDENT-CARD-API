
import mongoose from "mongoose";

const workerSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    email: { type: String, required: true, unique: true },
    fullNames: String,
    phoneNumber: String,
    location: String
});
export const Worker = mongoose.model("Worker", workerSchema);


