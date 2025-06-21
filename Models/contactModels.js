import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({

    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    name: String,
    email: String,
    phone: String,
    message: String,
});

export const Contact = mongoose.model("Contact", contactSchema);
