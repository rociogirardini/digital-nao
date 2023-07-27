import Restaurant from "../models/restaurants.js";

const searchRestaurants = async (req, res) => {
  const { name, cuisine, coordinates, maxDistance } = req.query;

  const pipeline = []; // Pipeline de agregación

  if (name) {
    pipeline.push({
      $match: {
        name: {
          $regex: name,
          $options: "i",
        },
      },
    });
  }

  if (cuisine) {
    pipeline.push({
      $match: {
        cuisine: {
          $regex: cuisine,
          $options: "i",
        },
      },
    });
  }

  if (coordinates && maxDistance) {
    const [longitude, latitude] = coordinates.split(",").map(parseFloat);
    const distanceInMeters = parseFloat(maxDistance) * 1000;

    pipeline.push({
      $match: {
        "address.coord": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: distanceInMeters,
          },
        },
      },
    });
  }

  // Proyectar la búsqueda
  pipeline.push({
    $project: {
      name: 1,
      cuisine: 1,
      address: 1,
    },
  });

  // Ordenar los resultados por nombre de restaurante
  pipeline.push({
    $sort: {
      name: 1,
    },
  });

  try {
    const restaurants = await Restaurant.aggregate(pipeline);
    const total = restaurants.length;
    res.json({
        total,
        restaurants
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar restaurantes.");
  }
};

export default searchRestaurants;
