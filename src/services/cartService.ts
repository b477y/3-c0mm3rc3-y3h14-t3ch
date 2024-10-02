import { cartModel, ICart } from "../models/cartModel"
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
    userId: string,
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 })
    await cart.save();
    return cart;
}

interface GetActiveCartForUser {
    userId: string,
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" })
    if (!cart) {
        cart = await createCartForUser({ userId })
    }
    return cart;
}

interface ClearCart {
    userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId });
    cart.items = []
    cart.totalAmount = 0
    const updatedCart = await cart.save()
    return { data: updatedCart, statusCode: 200 }
}

interface AddItemToCart {
    userId: string,
    productId: any,
    quantity: number,
}

export const addItemToCart = async ({ userId, productId, quantity }: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId })

    // * Does the item exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId)

    if (existsInCart) {
        return { data: "Item already exists in cart!", statusCode: 400 }
    }

    // * Fetch the product
    const product = await productModel.findById(productId)

    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }

    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 }
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity })

    // * Update the totalAmount for the cart

    cart.totalAmount += product.price * quantity

    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 201 }

}

interface UpdateItemInCart {
    userId: string,
    productId: any,
    quantity: number,
}

export const updateItemInCart = async ({ userId, productId, quantity }: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId });

    const existsInCart = cart.items.find((p) => p.product.toString() === productId);

    if (!existsInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 }
    }

    const product = await productModel.findById(productId)

    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }

    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 }
    }

    let { total } = calculateCartTotalItems({ cart, productId })

    existsInCart.quantity = quantity;

    total += existsInCart.quantity * existsInCart.unitPrice;

    cart.totalAmount = total;

    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 200 }
}

interface DeleteProductFromCart {
    productId: any;
    userId: string;
}

export const deleteItemFromCart = async ({ productId, userId }: DeleteProductFromCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);

    if (!existsInCart) {
        return { data: "This item does not exist in cart", statusCode: 400 }
    }

    const { otherItemsInCart, total } = calculateCartTotalItems({ cart, productId })

    cart.items = otherItemsInCart;
    cart.totalAmount = total;

    const updatedCart = await cart.save()

    return { data: updatedCart, statusCode: 200 };
}

interface CalculateCartTotalItems {
    cart: ICart;
    productId: string;
}

const calculateCartTotalItems = ({ cart, productId }: CalculateCartTotalItems) => {

    const otherItemsInCart = cart.items.filter((p) => p.product.toString() !== productId)

    let total = otherItemsInCart.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice
        return sum;
    }, 0)

    return { otherItemsInCart, total }

}

interface Checkout {
    userId: string,
    address: string,
}

export const checkout = async ({ userId, address }: Checkout) => {
    if (!address) {
        return { data: "Please add the address", statusCode: 400 }
    }

    const cart = await getActiveCartForUser({ userId })

    const orderItems: IOrderItem[] = []

    // * Loop cartItems and create orderItems
    for (const item of cart.items) {
        const product = await productModel.findById(item.product)

        if (!product) {
            return { data: "Product not found", statusCode: 400 }
        }

        const orderItem: IOrderItem = {
            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }

        orderItems.push(orderItem)
    }
    const order: IOrder = await orderModel.create({
        orderItems,
        total: cart.totalAmount,
        address,
        userId,
    })

    await order.save()

    // * Update the cart status to be "completed"
    cart.status = "completed"
    await cart.save()

    return { data: order, statusCode: 200 }
}