import { Request, Response } from "express"
import { prismaCCard  } from "../../../db";

export const getAllCard = async(req: Request, res: Response) => {
    
    try {
        const cards = await  prismaCCard.findMany();
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
        amountAllowed,
        franchise, 
        type } = req.body;
        
     try {
        const cardDB = await prismaCCard.findFirst({
            where: { amountAllowed, franchise, type }
        })

        if(cardDB){
            return res.status(400).json({
                ok: false,
                msg: "Ya hay una tarjeta modelo con los mismos valores"
            })
        }

        const newCard = await prismaCCard.create({
            data: {
                amountAllowed,
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
        const cardDB = await prismaCCard.findFirst({
            where: { id }
        })

        if(!cardDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontró tarjeta módelo "
            })
        }

        const cardUpdate = await prismaCCard.update({
            where: {id},
            data: {
                amountAllowed,
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


    res.status(200).json({
        ok: true,
        cards: "Card updated"
    })
}

export const deleteCard = async(req: Request, res: Response) => {
    
    const id = Number( req.params.id );

    try {
        const cardDB = await prismaCCard.findFirst({
            where: { id }
        })

        if(!cardDB){
            return res.status(404).json({
                ok: false,
                msg: "El recurso que desea eliminar no existe"
            })
        }

        await prismaCCard.delete({
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