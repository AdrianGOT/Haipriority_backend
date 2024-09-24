import { Request, Response } from "express"; 
import { prismaLoaninit } from "../../../db";


export const getAllLoanInit = async(req: Request, res: Response) => {
    
    try {
        
        const loans = await prismaLoaninit.findMany();
        return res.status(200).json({
            ok: true,
            loans
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }
}

export const createLoanInit = async(req: Request, res: Response) => {

    const { 
        title,
        interest,
        amountAllowed
     } = req.body;

    try {

        const loanDB = await prismaLoaninit.findFirst({
            where: {title, amountAllowed, interest}
        })

        if(loanDB){
            return res.status(404).json({
                ok: false,
                msg: "Ya existe un recurso con los mismos valores"
            })
        }

        const loanCreated = await prismaLoaninit.create({
            data: {
                title, 
                amountAllowed, 
                interest
            }
        })

        return res.status(200).json({
            ok: true,
            msg: "Se ha creado el prestamo modelo satisfactoriamente",
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

export const updateLoanInit = async(req: Request, res: Response) => {

    const id = Number( req.params.id );
 
    const { 
        title,
        interest,
        amountAllowed,
     } = req.body;
    
        try {

            const loanDB = await prismaLoaninit.findFirst({
                where: { id }
            })

            if(!loanDB){
                return res.status(404).json({
                    ok: false,
                    msg: "El prestamo buscado no existe"
                })
            }

            const loanUpdated = await prismaLoaninit.update({
                where: { id },
                data: { 
                    title, 
                    interest,
                    amountAllowed,
                }
            })

            return res.status(200).json({
                ok: true,
                loan: loanUpdated,
                msg: "Se ha actualizado el recurso satisfactoriamente"
            })

        } catch (error) {
            
            return res.status(500).json({
                ok: false,
                msg: "Ha ocurrido un error inesperado"
            })
        }

}

export const deleteLoanInit = async(req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        
        const loanDB = await prismaLoaninit.findFirst({
            where: { id }
        })

        if(!loanDB){
            return res.status(404).json({
                ok:false,
                msg: "No se encontró el recurso deseado"
            })
        }

        await prismaLoaninit.delete({
            where: {id}
        })
        
        res.status(200).json({
            ok: true,
            msg: "Se ha eliminado el recurso satisfactoriamente"
        })
    } catch (error) {

        console.log(error);
        res.status(200).json({
            ok: true,
            cards: "Ha ocurrido un error inesperado"
        })
        
    }

}