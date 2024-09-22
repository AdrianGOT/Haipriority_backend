import { NextFunction, Request, Response } from "express";
import { ROLES } from "../modules/client/interfaces/client.interfaces";

export const checkRole = (roles: ROLES[]) =>  (req: Request, res: Response, next: NextFunction) => {
    const { client } = req;
    const hasRole = roles.some(role => client?.roles.includes( role ));
    if(!hasRole) {
        return res.status(403).json({
            ok: false,
            msg: 'No posee los permisos necesarios'
        })
    }
        
    next();
}