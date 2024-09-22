import { response, request, Request, Response } from "express"; 
import { prismaClient } from "../../../db";
import { compare } from "../../../helpers/handleBcrypt";
import { tokenSign } from "../../../helpers/handleJwt";
import { ClientIdNameRoles, ROLES } from "../../client/interfaces/client.interfaces";

import fs from "fs";
import { decodeEncrypt } from "../../../keys/managementKeys";
// import { decodeEncrypt } from "../../keys/generateKeys";

export const login = async(req: Request, res: Response) => {
    
    const {email, password} = req.body;
    const passwordDecoded = decodeEncrypt(password);

    try {
        const clientDB = await prismaClient.findFirst({ 
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                createdAt: true,
                state: true,
                phoneNumber: true,
                roles: {
                    select:{
                        role: {
                            select:{
                                role: true
                            }
                        }
                    }
                }
            }  
        });

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no se encuentra registrado"
            })
        }

        if(!clientDB.state){
            return res.status(401).json({
                ok: false,
                msg: "El cliente se encuentra inactivo"
            })
        }

        const samePassword = await compare(passwordDecoded, clientDB.password);

        if(!samePassword){
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales son incorrectas"
            })
        }
        const payload: ClientIdNameRoles = {
            name: clientDB.name,
            id: clientDB.id,
            roles: clientDB.roles.map(role => role.role.role) as ROLES[]
        }
        
        const token = await tokenSign(payload);

        return res.status(200).json({
            ok: true,
            token,
            client: {
                id: clientDB.id,
                name: clientDB.name,
                email: clientDB.email,
                createdAt: clientDB.createdAt,
                phoneNumber: clientDB.phoneNumber,
                roles: clientDB.roles.map(role => role.role.role)
            }
        })

    } catch (error) {
      
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado!"
        })
        
    }
}

export const getPublicKey = async(req: Request, res: Response) => {
    try {
        const keyFilePath = process.env.PUBLIC_KEY_FILE_PATH;
        const publicKeyByFile = fs.readFileSync(`${keyFilePath}`, "utf-8")

        return res.status(200).json({
            ok: true,
            publicKey: `${publicKeyByFile}`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado!"
        })
    }

}


