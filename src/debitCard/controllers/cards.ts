import { Request, Response } from "express"
import { prismaDCard } from "../../db";

export const getAllCard = async(req: Request, res: Response) => {
    
    try {
        const cards = await  prismaDCard.findMany();
        return res.status(200).json({
            ok: true,
            cards
        })
        
    } catch (error) {
        return res.status(200).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
    }
}

export const createCard = async(req: Request, res: Response) => {

    const {
        franchise, 
        type } = req.body;
        
     try {
        const cardDB = await prismaDCard.findFirst({
            where: { franchise, type }
        })

        if(cardDB){
            return res.status(400).json({
                ok: false,
                msg: "Ya hay una tarjeta modelo con los mismos valores"
            })
        }

        const newCard = await prismaDCard.create({
            data: {
                franchise,
                type
            }
        })

        return res.status(201).json({
            ok: true,
            msg: "Se ha creado la tarjeta modelo satisfactoriamente!",
            card: newCard
        })
     } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado",
        })
     }


}

export const updateCard = async(req: Request, res: Response) => {

    const id = Number(req.params.id);
    
    const { 
        franchise,
        amountAllowed,
        type } = req.body;
        
     try {
        const cardDB = await prismaDCard.findFirst({
            where: { id }
        })

        if(!cardDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontró tarjeta módelo "
            })
        }

        const cardUpdate = await prismaDCard.update({
            where: {id},
            data: {
                franchise,
                type
            }
        })

        return res.status(200).json({
            ok: true,
            msg: "Se ha actualizado la tarjeta módelo satisfactoriamente!",
            card: cardUpdate
        })

     } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado",
        })
     }
}

export const deleteCard = async(req: Request, res: Response) => {
    
    const id = Number( req.params.id );

    try {
        const cardDB = await prismaDCard.findFirst({
            where: { id }
        })

        if(!cardDB){
            return res.status(404).json({
                ok: false,
                msg: "El recurso que desea eliminar no existe"
            })
        }

        await prismaDCard.delete({
            where: { id }
        })

        return res.status(200).json({
            ok: true,
            cards: "Se ha eliminado la tarjeta modelo satisfactoriamente!"
        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            cards: "Ha ocurrido un error inesperado!"
        })
    }
    
}