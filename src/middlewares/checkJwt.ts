import { Request, Response, NextFunction } from 'express';
import { tokenVerify } from '../helpers/handleJwt';
import { JwtPayload } from 'jsonwebtoken';

export const validateToken = async(req: Request, res: Response, next: NextFunction) => {
    const authoText = req.headers.authorization;
    
    if(!authoText?.includes('Bearer')){
        return res.status(401).json({
            ok: false,
            msg: 'No se encuentra registrado'
        })
    }
    const token = authoText.split(' ')[1]; 
    const tokenVerified = await tokenVerify(token);
    
  

    if(tokenVerified && (tokenVerified as JwtPayload).id ){
        req.client={ 
            id: (tokenVerified as JwtPayload).id,
            roles: (tokenVerified as JwtPayload).roles
        }
        next();
    } 
    else {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}