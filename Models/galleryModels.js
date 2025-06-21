import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    title: String,
    backdropImage: { type: String },
    description: String
});
export const Gallery = mongoose.model("Gallery", gallerySchema);