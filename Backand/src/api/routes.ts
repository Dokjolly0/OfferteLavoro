import express from "express";
import offerte_lavoro_router from "./offerte_lavoro/offerte_lavoro.router";

const router = express.Router();

router.use("/offerts", offerte_lavoro_router);

export default router;
