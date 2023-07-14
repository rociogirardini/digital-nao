import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const restaurantSchema = Schema({
  address: {
    building: {
      type: String,
    },
    coord: {
      type: Array
    },
    street: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  borough: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  grades: [
    {
      date: {
        type: Date,
      },
      grade:{
        type: String,
      },
      score: {
        type: Number,
      },
    },
  ],
  comments: [
    {
      date: {
        type: Date,
      },
      comment: {
        type: String,
      },
      _id: {
        type: ObjectId,
      },
    },
  ],
  name: {
    type: String,
  },
  restaurant_id: {
    type: String,
  },
});

export default model('Restaurant', restaurantSchema)