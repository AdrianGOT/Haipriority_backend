import { ROLES } from '../client/interfaces/client.interfaces';

export interface Token {
    id    : number,
    iat   : number,
    exp   : number
    name  : string,
    roles : ROLES[],
}