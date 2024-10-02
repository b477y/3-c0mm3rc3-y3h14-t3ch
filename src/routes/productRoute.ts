import { Router } from "express";
import productModel from "../models/productModel";
import { getAllProducts } from "../services/productService";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;