import { request, response } from "express";
import Restaurant from "../models/restaurants.js";

const getRestaurants = async (req, res) => {
  const { limit = 15, from = 0 } = req.query;
  const restaurants = await Restaurant.find()
    .skip(Number(from))
    .limit(Number(limit));

  const total = await Restaurant.countDocuments();

  res.json({
    total,
    restaurants,
  });
};

const addNewRestaurant = async (req = request, res = response) => {
  const body = req.body;
  const restaurant = new Restaurant(body);

  // Validar que el restaurante no existe en la DB
  const restaurant_id = req.body.restaurant_id;
  const restaurantExists = await Restaurant.findOne({ restaurant_id });
  if (restaurantExists) {
    return res.status(400).json({
      msg: "El restaurante ya se encuentra en la base de datos.",
    });
  }

  await restaurant.save();

  res.json({
    restaurant,
  });
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment, date } = req.body;
  try {
      const restaurant = await Restaurant.findOneAndUpdate(
          {restaurant_id: id},
          { $push: { comments: { comment, date } } },
          { new: true }
          );

    if (!restaurant) {
      return res.status(404).json({
        msg: "Restaurante no encontrado",
      });
    }

    res.json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error al enviar el comentario.");
  }
};

const addScore = async(req, res) => {
    const { id } = req.params;
    const { score } = req.body;
    try {
        const restaurant = await Restaurant.findOneAndUpdate(
            {restaurant_id: id},
            { $push: { "restaurant.grades": score } },
            { new: true }
            );
  
      if (!restaurant) {
        return res.status(404).json({
          msg: "Restaurante no encontrado",
        });
      }
  
      res.json({
        restaurant,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error al enviar la puntuación.");
    }

}

export { getRestaurants, addNewRestaurant, addComment, addScore };
