import express from "express";
import {
  get_offerts,
  get_offerts_sorted_date,
  add_offert,
  update_offert,
  delete_offert,
} from "./offerte_lavoro.controller";
import { offerte_lavoro_dto } from "./offerte_lavoro.dto";
import { validateDto } from "../../utils/validate_dto"; // Importa il middleware

const router = express.Router();

router.get("/view", get_offerts);
router.get("/view-sorted-by-date", get_offerts_sorted_date);
router.post("/add", validateDto(offerte_lavoro_dto), add_offert);
router.put("/update/:id", update_offert);
router.delete("/delete/:id", delete_offert);

export default router;
