import { FRANCHISE } from "../interfaces/card";

export const generateCardNumber = 
    (numberCardList: string[], franchise: FRANCHISE) =>{
        
        const initialNumber = franchise === FRANCHISE.visa? 4 : 5;
        
        if(numberCardList.length === 0 ) {
            return getRandomInt(initialNumber);
        }
        
        let numberGenerated = getRandomInt(initialNumber);
        
        while(numberCardList.includes(numberGenerated)){
            numberGenerated = getRandomInt(initialNumber);
        }
        return numberGenerated;

}

const getRandomInt = (initNumber: number) => {
    const numberLimit = 1000000000000000;
    const randomNumber = Math.floor(Math.random() * numberLimit)
    return `${initNumber}${randomNumber}`;
}

export const assigmentOfCardName = (cardName: string): string => {
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
