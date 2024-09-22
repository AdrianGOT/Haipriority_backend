export interface InitClient {
    id?:          number;
    name:         string;
    email:        string;
    password:     string;
    createdAt?:   Date;
    state?:       boolean;
    phoneNumber?:  string;
    roles?:       ROLES[];
}

export interface Client extends InitClient{
    creditCards?: string;
    debitCards?:  string;
    loans?:        string;
}

export type ClientUpdate = Pick<InitClient, "email" |"name" | "phoneNumber" > 
export type ClientIdNameRoles = Pick<Client, "id" | "name" | "roles">;

export enum ROLES {
    user = "USER",
    admin = "ADMIN",
}