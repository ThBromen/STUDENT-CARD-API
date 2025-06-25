import express from "express";
import { addCardRequest, getCardRequests, deleteCardRequest, updateCardRequestStatus,getCardRequestsByUniversity, getAllCards } from "../Controllers/cardRequest/cardRequestController";
import { cardRequestImageUpload, galleryImageUpload } from "../Middleware/cloudinary";
import { verifyCardByHash } from "../Controllers/cardRequest/verifyCard";


const cardRequestRouter = express.Router();

cardRequestRouter.post("/card", cardRequestImageUpload  , addCardRequest);
cardRequestRouter.get("/card/all-cards", getAllCards);
cardRequestRouter.patch("/card/:id", updateCardRequestStatus);
cardRequestRouter.get("/card", getCardRequests);
cardRequestRouter.delete("/card/:id", deleteCardRequest);
cardRequestRouter.get("/verify/:hash", verifyCardByHash);
cardRequestRouter.get("/card/:universityId", getCardRequestsByUniversity);

export default cardRequestRouter;
