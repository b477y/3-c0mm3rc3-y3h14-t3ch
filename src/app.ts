import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from './services/productService'


const app = express();

app.use(express.json())

mongoose
    .connect("mongodb://localhost:27018/ecommerce")
    .then(() => console.log("db connected"))
    .catch((err) => console.log("error occured while connecting to the database", err))

// Seed the products to database
seedInitialProducts()

app.use('/user', userRoute)
app.use('/product', productRoute)


export default app;