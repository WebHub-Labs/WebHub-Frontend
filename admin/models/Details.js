import { Schema, model, models } from "mongoose";

const DetailsSchema = new Schema({
  name: { type: String, required: true },
});

const Details = models.Details || model("Details", DetailsSchema);

export default Details;
