import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },  
  color: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
