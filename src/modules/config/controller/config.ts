import { Request, Response } from "express";
import fs from 'fs';

const frontKeyPath = process.env.SECRET_KEY_PATH;
const frontIvPath = process.env.SECRET_IV_PATH;

export const getSecretKey = async (req: Request, res: Response) => {
    
    try {

        const secretKey = fs.readFileSync(`${frontKeyPath}`).toString("base64");
        const iv = fs.readFileSync(`${frontIvPath}`).toString("base64");
        
        return res.status(200).json({
            data: {secretKey, iv}
        });

    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado y toca volver a inicar sesion"
        })
    }

}