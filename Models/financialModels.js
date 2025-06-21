
import mongoose from "mongoose";

const financialSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    sales: String,
    litresSold: String,
    animalEarTag: String,
    financeType: String,
    notes: String,
    dateOfRecord: String,
    paymentDate: String,
    amount: String,
    adminstrator: String
});
export const Financial = mongoose.model("Financial", financialSchema);

//