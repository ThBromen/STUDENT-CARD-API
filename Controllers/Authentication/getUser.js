import { User } from "../../Models";
import { catchAsync } from "../Error/catchAsync";

export const getUser = catchAsync(async (req, res) => {
  let data = await User.find();
  console.log("list of users is selected !!");

  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  results.result = data.slice(startIndex, endIndex);

  if (page && limit) {
    return res.status(200).json({
      message: "list of users by pagination !!",
      results
    });
  }
  else {
    return res.status(200).json({
      message: "list of users !!",
      data
    });
  }

});

