import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {});
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, async () => {
  await start();
  console.log("Listening on port 3000!!!!");
});
