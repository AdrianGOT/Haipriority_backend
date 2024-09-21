import { Request, Response } from "express";
import { ROLES } from "../../client/interfaces/client.interfaces";

interface ItemList {
    path: string;
    text: string;
    selected: boolean
}

export const getMenuInfo = async(req: Request, res: Response) => {
    
    const { client } = req;
    const menuList = getMenuListByRoles(client?.roles || []);

    return res.status(200).json({
        ok: true,
        menuList
    })
}

const getMenuListByRoles = (roles: ROLES[]) => {
    let menuList: ItemList[];

    if(roles.includes(ROLES.user)) {
        menuList = USER_MENU_ITEMS
    }else if(roles.includes(ROLES.admin)){
        menuList = [...USER_MENU_ITEMS, ...ADMIN_ITEMS]
    }else menuList = []

    return menuList;
}

const USER_MENU_ITEMS = [
    
    {
        path: 'credit-card',
        text: 'Tarjetas de credito',
        selected: false
    },
    {
        path: 'debit-card',
        text: 'Tarjetas de debito',
        selected: false
    },
    {
        path: 'loan',
        text: 'Prestamos',
        selected: false
    },
] 

const ADMIN_ITEMS = [
    {
        path: 'client',
        text: 'Clientes',
        selected: false
    }
] 