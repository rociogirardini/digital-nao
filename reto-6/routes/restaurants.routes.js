import { Router } from "express";
import { getRestaurants, addNewRestaurant, addComment, addScore } from "../controllers/restaurant.controller.js";
import searchRestaurants from "../controllers/search.controller.js";

const router = Router();

router.get("/", getRestaurants);

router.post("/", addNewRestaurant);

router.patch("/comments/:id", addComment);

router.patch("/scores/:id", addScore);

router.get("/search", searchRestaurants);

export default router;
