import { Activity } from "../../Models";
import { catchAsync } from "../Error/catchAsync";

export const addActivityCategory = catchAsync(async (req, res) => {

    const newCategory = await Activity.create(req.body);

    console.log("new Activity Category was created successfully");

    return res.status(201).json({
        message: " Activity Category registered successfully",
        newCategory

    });
});

export const deleteActivityCategory = catchAsync(async (req, res) => {
    const requestId = req.params.id;
    let data = await Activity.findById({ _id: requestId });

    if (!data) {
        return next(new AppError("no Activity Category  found with that ID", 404));
    }

    const result = await Activity.deleteMany(data);
    console.log("the Activity Category is deleted with ID:", data._id);
    return res.send(result);
});


export const getActivityCategory = catchAsync(async (req, res) => {
    let data = await Activity.find();

    if (!data) {
        return next(new AppError("no Activity Category found ", 404));
    }

    console.log("list of  Activity is selected !!");

    return res.status(200).json({
        message: "list of  Activity is selected  !!",
        data

    })
});


export const getActivityCategoryById = catchAsync(async (req, res) => {

    let requestId = req.params.id;
    let data = await Activity.findById({ _id: requestId });

    if (!data) {
        return next(new AppError("no  Activity category found with that ID", 404));
    }
    console.log("the  Activity  category is selected with ID:", data._id);
    res.status(200).json(data);
});
