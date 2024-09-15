import bcrypt from "bcrypt";


export const encrypt = async( password: string ): Promise<string> => {
    return await bcrypt.hash(password, bcrypt.genSaltSync());
}

export const compare = async(password: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
}