import { FRANCHISE } from "../../interfaces/card";

export interface Card {
    id           : number;
    type         : string;
    franchise    : FRANCHISE;
    amoutallowed : number ;
} 