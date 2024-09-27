import { Router } from "express";
import { login, register } from "../services/userService";
import userModel from "../models/userModel";

const router = Router()

router.post('/register', async (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    const { statusCode, data } = await register({ firstName, lastName, email, password }) // result
    response.status(statusCode).send(data) // result.statusCode & result.data
})

router.post('/login', async (request, response) => {
    const { email, password } = request.body
    const { data, statusCode } = await login({ email, password })
    response.status(statusCode).send(data)
})

export default router;