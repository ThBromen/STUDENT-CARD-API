
import mongoose from "mongoose";

const salesSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    activityType: { type: String, default: "Sales" },
    SaleDate: String,
    SalePrice: String,
    SoldTo: String,
    notes: String,

});

export const Sales = mongoose.model("Sales", salesSchema);



const activitySchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    activityType: String,
    saleDate: String,
    salePrice: String,
    soldTo: String,
    notes: String,
    breedingDate: String,
    methodOfBreeding: String,
    endDate: String,
    description: String,
    diseaseDiagnosed: String,
    dosageInml: String,
    routeType: String,

    // Date,earTag,activityType,notes,howItWent,dosageInml,description
    vaccinationDate: String,
    vaccineAdministered: String,
    castrationDate: String,
    castratedBy: String,
    castrationMethod: String,
    howItWent: { type: String, default: "Successful" },
    weaningDate: String,
    weaningWeight: String,
    birthDate: String,
    birthWeight: String,
    deathCause: String,
    deathDate: String,
    Notes: String,
    promotionDate: String,
    checkDate: String,
    method: String,
    result: String,
});

export const Activity = mongoose.model("Activity", activitySchema);






const breedingSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    activityType: { type: String, default: "Breeding" },
    breedingDate: String,
    methodOfBreeding: String,
    endDate: String
});
export const Breeding = mongoose.model("Breeding", breedingSchema);



const treatmentSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    activityType: { type: String, default: "Treatment" },
    description: String,
    earTag: String,
    treatmentDate: String,
    diseaseDiagnosed: String,
    dosageInml: String,
    routeType: String,
    vaccinationDate: String,
    vaccineAdministered: String
});
export const Treatment = mongoose.model("Treatment", treatmentSchema);




const castrationSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    activityType: { type: String, default: "Castration" },
    castrationdDate: String,
    CastratedBy: String,
    castrationdMethod: String,
    howItWent: { type: String, default: "Successful" },
    Notes: String
});
export const Castration = mongoose.model("Castration", castrationSchema);



const weaningSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    activityType: { type: String, default: "Weaning" },
    weaningDate: String,
    WeaningWeight: String
});
export const Weaning = mongoose.model("Weaning", weaningSchema);




const NewBirthSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    activityType: { type: String, default: "Newbirth" },
    BirthDate: String,
    BirthWeight: String,
    Notes: String
});
export const Newbirth = mongoose.model("Newbirth", NewBirthSchema);


const DeadActivitySchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    deathCause: { type: String },
    DeathDate: String,
    Notes: String,
    activityType: { type: String, default: "Dead Cow" },
});





export const DeadActivity = mongoose.model("DeadActivity", DeadActivitySchema);

// Promote TO Bull: promotion date, note, EarTag
const PromotedToBullSchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    promotionDate: { type: String },
    Notes: String,
    activityType: { type: String, default: "PromotedToBull" },
});
export const PromotedToBull = mongoose.model("PromotedToBull", PromotedToBullSchema);

// Purginacy check: checkDate, method, result, note
const PurginacySchema = mongoose.Schema({
    Date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }),
    },
    earTag: String,
    checkDate: { type: String },
    method: String,
    result: String,
    Notes: String,
    activityType: { type: String, default: "Purginacy" },
});
export const Purginacy = mongoose.model("Purginacy", PurginacySchema);





// Category.find()
//     .populate("categoryType")
//     .then(p => console.log(p))
//     .catch(error => console.log(error));


// Breed.find()
//     .populate("breedType")
//     .then(p => console.log(p))
//     .catch(error => console.log(error)); 