import { ROLES } from '../client/interfaces/client.interfaces';

declare global{
    namespace Express {
        interface Request{
            client?: {
                id: number,
                roles: ROLES[]
            }
        }
    }
}