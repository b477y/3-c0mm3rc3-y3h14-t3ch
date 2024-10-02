import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitialProducts = async () => {

    try {
        const products = [
            {
                title: "OPTIMUM NUTRITION PLANT PROTEIN",
                image: "https://ifit-eg.com/wp-content/uploads/2024/01/on-1117733_Image_01-min.jpg",
                price: 2500,
                stock: 16,
            },
            {
                title: "DYMATIZE ISO 100 PROTEIN",
                image: "https://ifit-eg.com/wp-content/uploads/2023/09/Dymatize-fruity-pebbles-3lbs.png",
                price: 3465,
                stock: 22,
            },
            {
                title: "OPTIMUM NUTRITION GOLD STANDARD",
                image: "https://ifit-eg.com/wp-content/uploads/2023/09/gsw-5lbs-strawberry.png",
                price: 3450,
                stock: 12,
            },
        ]

        const existingProducts = await getAllProducts();

        if (existingProducts.length === 0) {
            await productModel.insertMany(products)
        }
    } catch (error) {
        console.error("cannot see database", error);
    }
}