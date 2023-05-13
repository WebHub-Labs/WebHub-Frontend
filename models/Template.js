import { Schema, model, models } from "mongoose";

const TemplateSchema = new Schema({
  primarycolor: { type: String, required: true },
  footercolor: { type: String, required: true },
});

const Template = models.Template || model("Template", TemplateSchema);

export default Template;
