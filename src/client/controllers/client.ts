import { response, request, Response, Request } from "express";
import { prismaClient, prismaRole, prismaRoleClient } from "../../db";
import { encrypt } from "../../helpers/handleBcrypt";
import { ROLES } from "../interfaces/client.interfaces";

interface ClientInfoUpdated {
    name        : string;
    email       : string;
    password?   : string;
    phoneNumber : string;
}

export const getAllClients = async(req: Request, res: Response) => {

    try {
        const clients = await prismaClient.findMany({
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

        res.status(200).json({
            ok: true,
            clients: clients.map(client => ({...client, roles: client.roles.map(role => role.role.role)}))
        })
        
    } catch (error) {
          res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }

}

export const getClientInfo = async(req: Request, res: Response) => {
    const { client } = req;
    
    try {
        const clientDB = await prismaClient.findFirst({
            where: {id: client?.id},
            select: {
                id: true,
                name: true,
                email: true,
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
        })

        if(!clientDB){
            return res.status(401).json({
                ok: false,
                msg: "No se ha encontrado registrado"
            })
        }

        if(!clientDB.state){
            return res.status(401).json({
                ok: false,
                msg: "No se encuentra activo"
            })
        }
        
        return res.status(200).json({
            ok: true,
            client: {...clientDB, roles: clientDB.roles.map(role => role.role.role)}
        })

    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }
}

export const getClientById = (req: Request, res: Response) => {
    
    res.status(200).json({
        ok: true,
        cards: ["client one", "client two"]
    })
}

export const createClient = async(req: Request, res: Response) => {
    
    const {
        name, 
        email, 
        password, 
        phoneNumber} = req.body;
    

    try {
        const clientDB  = await prismaClient.findFirst({
            where: { email }
        })

        if(clientDB){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya se encuentra registrado"
            })
        }

        // Esto es para determinar a quien se le coloca el rol de admin
        const role = email.toLowerCase().includes("admin")? ROLES.admin : ROLES.user;

        const passwordEncrypted = await encrypt( password );

        const clientCreated = await prismaClient.create({
            data: {
                name,
                email,
                state: true,
                password: passwordEncrypted,
                phoneNumber,

            },
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
        })

        const roleId = (await prismaRole.findFirst({ where: {role} }))!.id
        const clientId = clientCreated.id;

        await prismaRoleClient.create({
            data: { clientId, roleId }
        })
    
        return res.status(200).json({
            ok: true,
            msg: "El cliente ha sido creado satisfactoriamente!",
            client: {
                ...clientCreated,
                roles: clientCreated.roles.map(role => role.role.role)
            }
        });

        
    } catch (error) {
        console.log( error)
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }
    
}

export const updateClient = async(req: Request, res: Response) => {

    const clientId  = Number(req.params.id);
    const {
        name,
        email,
        phoneNumber,
        password
    } = req.body;

    try {

        const clientDB = await prismaClient.findFirst({
            where: {id: clientId}
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "No se ha encontrado al cliente solicitado"
            })
        }

        const infoToUdated: ClientInfoUpdated = {
            name: name,
            email: email,
            phoneNumber: phoneNumber
        }

        if(password) infoToUdated["password"] = password;

        const clientUpdated = await prismaClient.update({
            where: {id: clientId},
            data: infoToUdated,
            select: {
                id: true,
                name: true,
                email: true,
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

        })

        return res.status(200).json({
            ok: true,
            msg: "Se ha actualizado el cliente satisfactoriamente",
            client: {...clientUpdated, roles: clientUpdated.roles.map(role => role.role.role)}
                
            
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }

}

export const deleteClient = (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        cards: "client deleted"
    })
}