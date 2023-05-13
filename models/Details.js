import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema({
  name: String,
});

const DetailsModel = mongoose.model("Details", DetailsSchema);

export default DetailsModel;
