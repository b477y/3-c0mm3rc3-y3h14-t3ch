import Router from 'express'
import { getActiveCartForUser } from '../services/cartService'
import validateJWT from '../middlewares/validateJWT'
import { ExtendRequest } from "../types/extendedRequest"
import { addItemToCart, updateItemInCart } from "../services/cartService"

const router = Router()

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id
    const cart = await getActiveCartForUser({ userId })
    res.status(200).send(cart)
})

router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity })
    const { data, statusCode } = response
    res.status(statusCode).send(data)
})

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id
    const { productId, quantity } = req.body;

    const response = await updateItemInCart({ userId, productId, quantity })
    const { data, statusCode } = response
    res.status(statusCode).send(data)
})

export default router;