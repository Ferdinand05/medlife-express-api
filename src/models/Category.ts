import { Schema, model } from "mongoose";
import { ICategory } from "../types/category";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = model("Category", categorySchema);

export default Category;
