
import { Request, Response } from "express";
import { prismaClient, prismaDCard, prismaDebitCard } from "../../../db";
import { ROLES } from "../../client/interfaces/client.interfaces";
import { assigmentOfCardName, generateCardNumber } from "../../../helpers/generateCardData";
import { FRANCHISE } from "../../../interfaces/card";
import { encryptingOneCard, encryptListOfCards } from "../../../helpers/encryptData";


export const getAllDebitCard = async(req: Request, res: Response) => {

    // TODO create card interfaces
    const client  = req.client;
    let cards;
    
    try {
        
        if(client?.roles.includes(ROLES.admin)){
            cards = await prismaDebitCard.findMany({
                select: {
                    id: true,
                    cvc: true,
                    number: true,
                    cardName: true,
                    createdAt: true,
                    current_amount: true,
                    expirationDate: true,
                    card: true,
                }
            });
            
        }else if(client?.roles.includes(ROLES.user)){
        
            cards = await prismaDebitCard.findMany({
                where: {clientId: client.id},
                select: {
                    id: true,
                    cvc: true,
                    number: true,
                    cardName: true,
                    createdAt: true,
                    current_amount: true,
                    expirationDate: true,
                    card: true,
                }
            });            
        }
        const cardsWithInfoEncrypted = encryptListOfCards(cards as any[])
        
        return res.status(200).json({
            ok: true,
            cards: cardsWithInfoEncrypted
        })
    
    
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: true,
            msg: "Ha ocurrido un error inesperado!" 
        })      
    }

  
}

export const createDebitCard = async(req: Request, res: Response) => {

    const { client } = req;

    const {
        cvc,
        cardName,
        expirationDate,
        cardId,
    } = req.body;
 
    try {
        // if the client exist 
        const clientDB = await prismaClient.findFirst({
            where: {id: client?.id},
            select: {
                debitCards: true,
            }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente solicitado no existe"
            })
        }
    
        // if the card exist 
        const cardDB = await prismaDCard.findFirst({
            where: {id: cardId}
        })

        if(!cardDB){
            return res.status(404).json({
                ok: false,
                msg: "la tarjeta modelo solicitada no existe"
            })
        }
        
        // Check if the card number is not in the another card
        const cardNumbersList = clientDB.debitCards.map(card => card.number)
        const newNumberCard = generateCardNumber(cardNumbersList,cardDB.franchise as FRANCHISE )
        const expDate = new Date(expirationDate);
    
        // create card
        const newDebitCard = await prismaDebitCard.create({
            data: {
                cvc,
                cardName: assigmentOfCardName(cardName),
                number: newNumberCard,
                expirationDate: expDate,
                card: {
                    connect: {id: cardDB.id}
                },
                client: {
                    connect: {id: client?.id}
                }
            }
        })

        const cardNumberEncrypted = encryptingOneCard(newDebitCard.number);
        const cardCvcEncrypted = encryptingOneCard(newDebitCard.cvc);

        return res.status(201).json({
            ok: true,
            msg: "se ha creado la tarjeta de credito satisfactoriamente!",
            card: {
                ...newDebitCard,
                number: cardNumberEncrypted,
                cvc: Number(cardCvcEncrypted),
            }
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            cards: "Ha ocurrido un error inesperado!"
        })
    }

    

}

export const updateDebitCard = async(req: Request, res: Response) => {
    
    const { client } = req;
    const id  = Number(req.params.id);

    const {
        cvc,
        cardName,
        expirationDate} = req.body;
    
    try {
        
        const clientDB = await prismaClient.findFirst({
            where: { id: client?.id},
            select: {
                debitCards: true
            }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no se encuentra registrado"
            })
        }

        if(clientDB.debitCards.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "El cliente no posee tarjetas"
            })
        }

        if(clientDB.debitCards.every(card=> card.id !== id)){
            return res.status(404).json({
                ok: false,
                msg: "La tarjeta que deasea editar no existe"
            })
        }
        
        const expDate = new Date(expirationDate);

        const cardUpdated = await prismaDebitCard.update({
            where: {id},
            data: {
                cvc,
                cardName,
                expirationDate: expDate,
            },
            select: {
                id: true,
                cvc: true,
                number: true,
                cardName: true,
                createdAt: true,
                current_amount: true,
                expirationDate: true,
                card: true, 
            }
        })

        const cardNumberEncrypted = encryptingOneCard(cardUpdated.number);
        const cardCvcEncrypted = encryptingOneCard(cardUpdated.cvc);

        return res.status(200).json({
            ok: true,
            msg: "Se ha actualizado la tarjeta satisfactoriamente!",
            card: {
                ...cardUpdated,
                number: cardNumberEncrypted,
                cvc: Number(cardCvcEncrypted),
            }
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })
        
    }

}

export const deleteDebitCard = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { client } = req;

    try {
        const clientDB = await prismaClient.findFirst({
            where: { id: client?.id},
            select: {
                debitCards: true
            }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no se encuentra registrado"
            })
        }

        if(clientDB.debitCards.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "El cliente no posee tarjetas"
            })
        }

        if(!clientDB.debitCards.some(card=> card.id === id)){
            return res.status(404).json({
                ok: false,
                msg: "La tarjeta que deasea eliminar no existe"
            })
        }

        await prismaDebitCard.delete({
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
