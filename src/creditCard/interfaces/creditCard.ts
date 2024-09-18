import { Card } from "./card";

export interface CreateCreditCard {
    cvc            : number;
    cardName       : string ;
    courtDate      : number;
    expirationDate : Date;
    paymentDate    : number;
    cardId         : number;
}

export interface CreditCardCompleted extends CreateCreditCard{
    id: number,
    card: Card,
}