import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    telepon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);
userSchema.path("password").select(false);

export default User;
