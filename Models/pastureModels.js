
import mongoose from "mongoose";

const PastureSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    pastureName: { type: String, required: true },
    Owner: { type: String, required: true },
    area: { type: String, required: true },
    numberOfCattles: String

});
export const Pasture = mongoose.model("Pasture", PastureSchema);