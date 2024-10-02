import Router from 'express'
import { getActiveCartForUser } from '../services/cartService'
import validateJWT from '../middlewares/validateJWT'
import { ExtendRequest } from "../types/extendedRequest"
import { addItemToCart, updateItemInCart, deleteItemFromCart, clearCart, checkout } from "../services/cartService"

const router = Router()

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id
        const cart = await getActiveCartForUser({ userId })
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(error)
    }
})

// ! delete all the items which belong to the cart

router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user._id
        const response = await clearCart({ userId })
        const { data, statusCode } = response
        res.status(statusCode).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id
        const { productId, quantity } = req.body;
        const response = await addItemToCart({ userId, productId, quantity })
        const { data, statusCode } = response
        res.status(statusCode).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user._id
        const { productId, quantity } = req.body;
        const response = await updateItemInCart({ userId, productId, quantity })
        const { data, statusCode } = response
        res.status(statusCode).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/items/:productId', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user._id
        const { productId } = req.params;
        const response = await deleteItemFromCart({ productId, userId })
        const { data, statusCode } = response
        res.status(statusCode).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/checkout', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user._id
        const { address } = req.body
        const { data, statusCode } = await checkout({ userId, address })
        res.status(statusCode).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;