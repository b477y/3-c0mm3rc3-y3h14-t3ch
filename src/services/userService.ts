import userModel, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({
    firstName,
    lastName,
    email,
    password,
}: RegisterDto) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return { data: "User already exists!", statusCode: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginDto {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginDto) => {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        return { data: "Incorrect email or password", statusCode: 400 };
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
        return {
            data: generateJWT({
                email,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
            }),
            statusCode: 200,
        };
    } else return { data: "Incorrect email or password", statusCode: 400 };
};

const generateJWT = (data: any) => {
    return jwt.sign(data, "48D1224475FFCD3BB6348C6F4272D");
};
