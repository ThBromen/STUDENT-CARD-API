
import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    categoryType: String,
    description: String
});
export const Category = mongoose.model("Category", categorySchema);


const breedSchema = mongoose.Schema({

    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    breedType: String,
    description: String
});

export const Breed = mongoose.model("Breed", breedSchema);





const cowSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: {
        type: String,
        required: true,
        unique: true
    },

    categoryType: {
        type: String,
        // required: true
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category"
    },

    breedType: {

        type: String,
        // required: true
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Breed"
    },
    lifeStatus: {
        type: String,
        // required: true,
        default: "Active"
    },

    status: {
        type: String,
        // required: true
    },

    dateOfGivingBirth: String,
    calfNumber: String,
    lactating: String,
    numberOfCalving: String,
    litresOfMilkItProduces: String,
    dateOfBirth: String,
    mothersEarTag: String,
    silesEarTag: { type: String },
    weightAtBirth: { type: String },
    wearningPeriod: { type: String },
    wearningWeight: { type: String },
    castrationPeriod: { type: String },
    inseminatioPeriod: String,
    whereItWasPurchased: String,
    purchasedDate: String,
    purchasedPrice: String,
    purchasedWeight: String,
    yearlingDate: String,
    yearlingWeight: String,
    deathCouse: { type: String },
    Deathdate: String,
    Notes: String,
    promotionDate: { type: String },
    checkDate: { type: String },
    method: String,
    result: String,
});
export const Cow = mongoose.model("Cow", cowSchema);




//earTag,categoryType,breedType,lifeStatus,status,dateOfGivingBirth,calfNumber,lactating,numberOfCalving,litresOfMilkItProduces,dateOfBirth,mothersEarTag

// Category.find()
//     .populate("categoryType")
//     .then(p => console.log(p))
//     .catch(error => console.log(error));


// Breed.find()
//     .populate("breedType")
//     .then(p => console.log(p))
//     .catch(error => console.log(error)); 