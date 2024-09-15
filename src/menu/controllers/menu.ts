import { request, response } from "express";
import { tokenVerify } from "../../helpers/handleJwt";
import { ROLES } from "../../client/interfaces/client.interfaces";
import { Token } from "../../interfaces/token";

export const getMenuInfo = async(req = request, res = response) => {

    const authoText = req.headers.authorization;
    const token = authoText!.split(' ')[1]; 
    const { roles } = (await tokenVerify(token)) as Token;
    const menuList = getMenuListByRoles(roles)
    
    return res.status(200).json({
        ok: true,
        menuList
    })
}

const getMenuListByRoles = (roles: ROLES[]) => {
    let menuList: string[];

    if(roles.includes(ROLES.user)) {
        menuList = USER_MENU_ITEMS
    }else if(roles.includes(ROLES.admin)){
        menuList = [...USER_MENU_ITEMS, 'clients']
    }else menuList = []

    return menuList;
}

const USER_MENU_ITEMS = [
    'credit-card',
    'debit-card',
    'loan'
] 