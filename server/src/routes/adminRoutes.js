import express from "express";
import { isAdmin, Protect } from "../middlewares/authMiddleware.js";
import { GetAllContacts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/contacts",Protect,isAdmin, GetAllContacts);
router

export default router;
