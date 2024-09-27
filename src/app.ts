import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();

app.use(express.json())

mongoose
    .connect("mongodb://localhost:27018/ecommerce")
    .then(() => console.log("db connected"))
    .catch((err) => console.log("error occured while connecting to the database", err))


app.use('/user', userRoute)


export default app;