import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from './services/productService'
import cartRoute from './routes/cartRoute'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

dotenv.config()

app.use(express.json())

mongoose
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("db connected"))
    .catch((err) => console.log("error occured while connecting to the database", err))

// Seed the products to database
seedInitialProducts()

app.use(cors())
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)


export default app;