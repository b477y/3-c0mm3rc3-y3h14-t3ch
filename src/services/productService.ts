import productModel, { IProduct } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitialProducts = async () => {
    const products = [
        { title: "product1", image: "image1", price: 20, stock: 46 },
        // { title: "product2", image: "image2", price: 50, stock: 53 },
        // { title: "product3", image: "image3", price: 880, stock: 14 },
        // { title: "product4", image: "image4", price: 200, stock: 47 },
        // { title: "product5", image: "image5", price: 220, stock: 66 },
        // { title: "product6", image: "image6", price: 10, stock: 48 },
        // { title: "product7", image: "image7", price: 80, stock: 16 },
        // { title: "product8", image: "image8", price: 40, stock: 155 },
        // { title: "product9", image: "image9", price: 320, stock: 26 },
        // { title: "product10", image: "image10", price: 90, stock: 15 },
    ]

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
        await productModel.insertMany(products)
    }
}