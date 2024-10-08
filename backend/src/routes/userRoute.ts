import { Router } from "express";
import { login, register } from "../services/userService";

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { statusCode, data } = await register({ firstName, lastName, email, password }) // result
        res.status(statusCode).json(data) // result.statusCode & result.data

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const { data, statusCode } = await login({ email, password })
        res.status(statusCode).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;