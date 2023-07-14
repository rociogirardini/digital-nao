import { Router } from "express";
import { getRestaurants, addNewRestaurant, addComment, addScore } from "../controllers/restaurant.controller.js";

const router = Router();

router.get("/", getRestaurants);

router.post("/", addNewRestaurant);

router.patch("/comments/:id", addComment);

router.patch("/scores/:id", addScore);

export default router;
