import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Successful connection to db");
  } catch (error) {
    console.log("Error connecting to db", error.message);
  }
}
