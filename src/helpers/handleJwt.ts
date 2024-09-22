import jwt from "jsonwebtoken";
import { ClientIdNameRoles } from "../modules/client/interfaces/client.interfaces";

export const tokenSign = async(payload: ClientIdNameRoles) => {
    const secret = process.env.JWT_SECRET_KEY as string;
    return jwt.sign(payload, secret, {expiresIn: "30m" } )
}

export const tokenVerify = async (token: string) => {
    const secret = process.env.JWT_SECRET_KEY as string;
    try {
        return jwt.verify(token, secret);
    } catch (error) {      
        return null;
    }
}