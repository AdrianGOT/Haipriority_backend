import { Request, Response } from "express"; 
import { prismaClient, prismaLoan, prismaLoaninit } from "../../db";


export const getAllLoan = async(req: Request, res: Response) => {

    const { client } = req;

    try {
        const loans = await prismaLoan.findMany({
            where: {clientId : client?.id },
            select: {
                clientId: true,
                createdAt:true,
                current_amount:true,
                id:true,
                limitDate:true,
                loanId: true,
                loan_init: true
            }
        });
        
        return res.status(200).json({
            ok: true,
            loans
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: true,
            msg:"Ha ocurrido un error inesperado"
        })
    }
}

export const createLoan = async(req: Request, res: Response) => {

    const { client } = req;

    const {
        current_amount,
        limitDate,
        loanId,
    } = req.body;

    try {
        
        const clientDB = await prismaClient.findFirst({
            where: {id: client?.id},
            select: { loans: true }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente relacionado no existe en la base de datos"
            })
        }

        const loandInitDB = await prismaLoaninit.findFirst({
            where: {id: loanId}
        })

        if(!loandInitDB){
            return res.status(404).json({
                ok: false,
                msg: "El prestamo modelo relacionado no existe en la base de datos"
            })
        }

        
        const loanCreated = await prismaLoan.create({
            data: {
                current_amount: Number(current_amount), 
                limitDate,
                client: {
                    connect: {id: client?.id}
                },
                loan_init:{
                    connect: {id: loanId}
                }
            }
        })


        return res.status(201).json({
            ok: true,
            msg: "se le ha asignado el prestamo satisfactoriamente",
            loan: loanCreated
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
        
    }

}

export const updateLoan = async(req: Request, res: Response) => {

    const id  = Number( req.params.id );
    const { client } = req;

    const { 
        current_amount,
        limitDate 
    } = req.body;

    try {
        const clientDB = await prismaClient.findFirst({
            where: {id: client?.id },
            select: {loans: true}
        })
        
        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente requerido no se encuentra registrado"
            })
        }
        
        if(clientDB.loans.length === 0 ){
            return res.status(400).json({
                ok: false,
                msg: "El cliente no tiene prestamos para actualizar"
            })
        }

        if(clientDB.loans.every(loan=> loan.id !== id)){
            return res.status(404).json({
                ok: false,
                msg: "El prestamo requerido no se encuentra registrado en el cliente"
            })
        }

        const newLimitDate = new Date(limitDate);
        const loanUpdated = await prismaLoan.update({
            where: { id },
            data: {
                current_amount,
                limitDate: newLimitDate
            }
        })
        
        return res.status(200).json({
            ok: true,
            msg: "Se ha actualizado el prestamo",
            loan: loanUpdated
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            cards: "Ha ocurrido un error inesperado"
        })
        
    }
    

}

export const deleteLoan = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { client } = req;

    try {
        const clientDB = await prismaClient.findFirst({
            where: { id: client?.id},
            select: {
                loans: true
            }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no se encuentra registrado"
            })
        }

        if(clientDB.loans.length === 0 ){
            return res.status(400).json({
                ok: false,
                msg: "El cliente no tiene prestamos para eliminar"
            })
        }

        if(clientDB.loans.every(loan=> loan.id !== id)){
            return res.status(404).json({
                ok: false,
                msg: "La tarjeta que deasea eliminar no existe en el registro del cliente"
            })
        }

        await prismaLoan.delete({
            where: {id}
        })

        return res.status(200).json({
            ok: true,
            msg: "Se ha eliminado la tarjeta satisfactoriamente"
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            cards: "Ha ocurrido un error inesperado"
        })    
    }
    
}