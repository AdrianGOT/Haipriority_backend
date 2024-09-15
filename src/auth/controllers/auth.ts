import { response, request } from "express"; 
import { prismaClient } from "../../db";
import { compare } from "../../helpers/handleBcrypt";
import { tokenSign } from "../../helpers/handleJwt";
import { ClientIdNameRoles, ROLES } from "../../client/interfaces/client.interfaces";
import { serialize } from "cookie";

export const login = async(req = request, res = response) => {
    
    const {email, password} = req.body;

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

        const samePassword = await compare(password, clientDB.password);

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



