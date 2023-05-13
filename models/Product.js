import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },

  color: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
