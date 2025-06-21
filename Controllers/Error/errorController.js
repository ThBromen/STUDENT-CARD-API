import AppError from "../../utils/appError";

const env = process.env.NODE_ENV || 'development';
const envFilePath = env === 'production' ? '.env.production' : '.env.development';


const handleCastErrorDB = err => {
  const message = `invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
}
const handleDuplicateFieldsDb = err => {
  const errors = Object.values(err.errors).map(el = el.message)
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate  field value : ${value}, Please use another value!`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
  const message = `invalid input data`;
  return new AppError(message, 400);

}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {

    console.error("ERROR ", err);

    res.status(500).json({
      status: "error",
      message: "Samething went wrong!"
    });
  }
}

module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err }; 2
  if (error.name === " CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDb(error);
  if (error.name === "validationError") error = handleValidationErrorDB(error);


  sendErrorDev(err, res);
  next();
};