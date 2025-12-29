import { Schema, model, Types } from "mongoose";
import { IMedicine } from "../types/medicine";

const medicineSchema = new Schema<IMedicine>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["tablet", "strip", "bottle", "ml"],
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Medicine = model("Medicine", medicineSchema);

export default Medicine;
