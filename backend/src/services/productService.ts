import productModel, { IProduct } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitialProducts = async () => {

    try {
        const products = [
            { title: "product1", image: "image1", price: 20, stock: 46 },
        ]

        const existingProducts = await getAllProducts();

        if (existingProducts.length === 0) {
            await productModel.insertMany(products)
        }
    } catch (error) {
        console.error("cannot see database", error);
    }


}