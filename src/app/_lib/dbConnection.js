import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error))
}