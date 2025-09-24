import express from "express";
import { isAdmin, Protect } from "../middlewares/authMiddleware.js";
import { AddBanquetHall, GetAllContacts, UpdateContacts } from "../controllers/adminController.js";
import multer from "multer";

const router = express.Router();
const upload=multer();

router.get("/contacts",Protect,isAdmin, GetAllContacts);
router.put("/contacts/:Qid", Protect, isAdmin, UpdateContacts);
router.post("/addbanquethall", Protect, isAdmin,upload.array("pictures") ,AddBanquetHall);

export default router;
