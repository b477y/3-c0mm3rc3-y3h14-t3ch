import Router from 'express'
import { getActiveCartForUser } from '../services/cartService'
import validateJWT from '../middlewares/validateJWT'
import { ExtendRequest } from '../middlewares/validateJWT'

const router = Router()

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id
    const cart = await getActiveCartForUser({ userId })
    res.status(200).send(cart)
})

export default router;