import express from "express";
import {
    getFinancial, getActivity, getBreeding, getCastration, getNewbirth,
    getSales, getTreatment, getWeaning, getCow, getPasture, getUsers, getDeadCow,
    getPromoted, getPagination
} from "../Controllers/report";
import { verfyToken, isAdmin } from "../Middleware";

const reportRouter = express.Router();



reportRouter.get("/getFinancial", verfyToken, isAdmin, getFinancial);
reportRouter.get("/getActivity", verfyToken, isAdmin, getActivity);
reportRouter.get("/getBreeding", verfyToken, isAdmin, getBreeding);
reportRouter.get("/getCastration", verfyToken, isAdmin, getCastration);
reportRouter.get("/getWeaning", verfyToken, isAdmin, getWeaning);
reportRouter.get("/getBreeding", verfyToken, isAdmin, getBreeding);
reportRouter.get("/getSales", verfyToken, isAdmin, getSales);
reportRouter.get("/getNewbirth", verfyToken, isAdmin, getNewbirth);
reportRouter.get("/getTreatment", verfyToken, isAdmin, getTreatment);
reportRouter.get("/getPasture", verfyToken, isAdmin, getPasture);
reportRouter.get("/getDeadCow", verfyToken, isAdmin, getDeadCow);
reportRouter.get("/getPagination", verfyToken, isAdmin, getPagination);
reportRouter.get("/getPromoted", verfyToken, isAdmin, getPromoted);


export default reportRouter;
