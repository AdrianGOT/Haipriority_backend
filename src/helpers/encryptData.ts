import fs from 'fs';
import { CreditCard } from '../modules/creditCard/interfaces/creditCard';

import nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';




export const encryptListOfCards= (cards: CreditCard[] | any[]) => {

    const frontKeyPath = process.env.SECRET_KEY_PATH;
    const frontIvPath = process.env.SECRET_IV_PATH;

    const secretKey = fs.readFileSync(`${frontKeyPath}`);
    const iv = fs.readFileSync(`${frontIvPath}`);

    return cards.map(card => {
        
        const numberEncoded = encryptData(card.number, iv, secretKey);        
        const cvcEncoded = encryptData(`${card.cvc}`, iv, secretKey);        
        return {
            ...card,
            number: numberEncoded,
            cvc: cvcEncoded,
        }
    })
}

export const encryptingOneCard = (text: string ) => {
    const frontKeyPath = process.env.SECRET_KEY_PATH;
    const frontIvPath = process.env.SECRET_IV_PATH;
    
    const secretKey = fs.readFileSync(`${frontKeyPath}`);
    const iv = fs.readFileSync(`${frontIvPath}`);

    const textDecoded = encryptData(text, iv, secretKey);        

    return textDecoded;
}

const encryptData = (text: string, iv: Buffer, secretKey: Buffer ) => {
    const dataInBytes = naclUtil.decodeUTF8(text);
    const dataEncoded = nacl.secretbox(dataInBytes, iv, secretKey); 
    return naclUtil.encodeBase64(dataEncoded)
}