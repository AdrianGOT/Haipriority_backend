import { Request, Response } from "express"; 
import { ROLES } from "../../client/interfaces/client.interfaces";
import { prismaCCard, prismaClient, prismaCreditCard } from "../../db";
import { generateCardNumber } from "../../helpers/generateCardData";
import { FRANCHISE } from "../../interfaces/card";
import { CreateCreditCard, CreditCardCompleted } from "../interfaces/creditCard";


export const getAllCreditCard = async(req: Request, res: Response) => {

    // TODO create card interfaces 
    const { client }  = req;
    let cards;
    
    try {
        
        if(client?.roles.includes(ROLES.admin)){
            cards = await prismaCreditCard.findMany();
            
            
        }else if(client?.roles.includes(ROLES.user)){
        
            cards = await prismaCreditCard.findMany({
                where: {clientId: client.id},
                select: {
                    id: true,
                    number: true,
                    cvc: true,
                    current_amount: true,
                    cardName: true,
                    expirationDate: true,
                    createdAt: true,
                    courtDate: true,
                    paymentDate: true,
                    card: true
                }
            });            
        }
        
        return res.status(200).json({
            ok: true,
            cards
        })
    
    
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: true,
            msg: "Ha ocurrido un error inesperado!" 
        })      
    }
}

export const createCreditCard = async(req: Request, res: Response) => {
    
    const { client } = req;

    const {
        cvc,
        cardName,
        courtDate,
        expirationDate,
        paymentDate,
        cardId,
    } = req.body as CreateCreditCard;
    
    try {
        // if the client exist 
        const clientDB = await prismaClient.findFirst({
            where: {id: client?.id},
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                createdAt: true,
                state: true,
                creditCards: true,
                phoneNumber: true,
            }
        })
    


        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente solicitado no existe"
            })
        }
            
        // if the card exist 
        const cardDB = await prismaCCard.findFirst({
            where: {id: cardId}
        })

        if(!cardDB){
            return res.status(404).json({
                ok: false,
                msg: "la tarjeta modelo solicitada no existe"
            })
        }

        // Final validations 
        const cardNumbersList = clientDB.creditCards.map((card) => card.number);
        const newCardNumber = generateCardNumber(cardNumbersList, cardDB.franchise as FRANCHISE );
        const newCardName = assigmentOfCardName(cardName);
        const expDate = new Date(expirationDate);
        
        
        // create card
        const newCreditCard = await prismaCreditCard.create({
            data: {
                cvc,
                cardName: newCardName, 
                number: newCardNumber,
                expirationDate: expDate,
                paymentDate,
                courtDate,
                card: {
                    connect: {id: cardDB.id},
                },
                client: {
                    connect: {id: clientDB.id}
                }
            }
        })


        return res.status(201).json({
            ok: true,
            msg: "se ha creado la tarjeta de credito satisfactoriamente!",
            card: newCreditCard
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            cards: "Ha ocurrido un error inesperado!"
        })
    }

    

}

export const updateCreditCard = async(req: Request, res: Response) => {
    
    const { client } = req;
    const id  = Number(req.params.id);

    const {
        cvc,
        cardName,
        expirationDate,
        paymentDate,
        courtDate } = req.body;
    
    try {
        // Check if the client exists and that he has a credit card
        const clientDB = await prismaClient.findFirst({
            where: { id: client?.id},
            select: {
                creditCards: true
            }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no se encuentra registrado"
            })
        }

        if(clientDB.creditCards.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "El cliente no posee tarjetas"
            })
        }

        if(clientDB.creditCards.every(card=> card.id !== id)){
            return res.status(404).json({
                ok: false,
                msg: "La tarjeta que deasea editar no existe"
            })
        }
        
        const expDate = new Date(expirationDate);

        const cardUpdated = await prismaCreditCard.update({
            where: {id},
            data: {
                cvc,
                cardName,
                expirationDate: expDate,
                paymentDate,
                courtDate
            },
            select: {
                    id: true,
                    number: true,
                    cvc: true,
                    current_amount: true,
                    cardName: true,
                    expirationDate: true,
                    createdAt: true,
                    courtDate: true,
                    paymentDate: true,
                    card: true
            }
        })

        return res.status(200).json({
            ok: true,
            msg: "Se ha actualizado la tarjeta satisfactoriamente!",
            card: cardUpdated
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error inesperado"
        })  
        
    }

}

export const deleteCreditCard = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { client } = req;

    try {
        const clientDB = await prismaClient.findFirst({
            where: { id: client?.id},
            select: {
                creditCards: true
            }
        })

        if(!clientDB){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no se encuentra registrado"
            })
        }

        if(clientDB.creditCards.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "El cliente no posee tarjetas"
            })
        }

        if(!clientDB.creditCards.some(card=> card.id === id)){
            return res.status(404).json({
                ok: false,
                msg: "La tarjeta que deasea eliminar no existe"
            })
        }

        await prismaCreditCard.delete({
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

// Other functions 
const assigmentOfCardName = (cardName: string): string => {
    let newCardName = "";
    
    if(cardName.length > 20){
        const cardNameSplitted = cardName.split(" ");
        
        for(const sliceOfName of cardNameSplitted){
            const auxName = `${newCardName} ${sliceOfName}`;
            if(auxName.length > 20) break;
            newCardName = auxName;
        }
    }
    
    return newCardName || cardName;
}
