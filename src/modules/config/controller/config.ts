import { Request, Response } from "express";
import { saveFrontPublicKey } from "../../../keys/managementKeys";

export const saveFrontendPublicKey = (req: Request, res: Response) => {
    const { publicKey } = req.body;

    try {
        saveFrontPublicKey(publicKey);
        return res.status(204).json();

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }

}