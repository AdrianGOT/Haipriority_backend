import fs from "fs";
import crypto from "crypto";

import nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

const publicKeyFilePath = process.env.PUBLIC_KEY_FILE_PATH;
const privateKeyFilePath = process.env.PRIVATE_KEY_FILE_PATH;
const frontPublicKeyFilePath = process.env.FRONT_PUBLIC_KEY_FILE_PATH;
const frontKeyPath = process.env.SECRET_KEY_PATH;
const frontIvPath = process.env.SECRET_IV_PATH;

const checkKeyFilesExist = (): boolean => {
    const existPublicFile = fs.existsSync(`${publicKeyFilePath}`);
    const existPrivateFile = fs.existsSync(`${privateKeyFilePath}`);
    
    
    if(!existPublicFile){
        try {
            fs.writeFileSync(`${publicKeyFilePath}`, "", "utf-8")
            console.log("The publicKey file had been created successfully");
        } catch (error) {
            throw error;
        }
    }

    if(!existPrivateFile){
        try {
            fs.writeFileSync(`${privateKeyFilePath}`, "", "utf-8");
            console.log("The privateKey file had been created successfully")   
        } catch (error) {
            throw error;
        }
    }
    return (existPublicFile && existPrivateFile);
} 

export const decodeEncrypt = (dataEncrypted: string) => {

    const bufferEncryptedData = Buffer.from(dataEncrypted, 'base64');
    const privateKey = fs.readFileSync(`${privateKeyFilePath}`, "utf-8");

    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      bufferEncryptedData
    );

    return  decryptedData.toString('utf8');

}

export const managementPairKeys = () => {

    if(checkKeyFilesExist()) return; 

    const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8', 
          format: 'pem', 
        }
    })

    // Save the keys in files .pem
    saveKeyInAFile(publicKey, publicKeyFilePath!);
    saveKeyInAFile(privateKey, privateKeyFilePath!);
    
}

export const generateKeyToSendFront = () => {
    const secretKey = nacl.randomBytes(32); // Generar una clave de 256 bits
    const iv = nacl.randomBytes(24); // Vector de inicialización
    
    fs.writeFileSync(`${frontKeyPath}`, secretKey);
    fs.writeFileSync(`${frontIvPath}`, iv );
}

export const saveFrontPublicKey = (publicKey: string) => {
    saveKeyInAFile(publicKey, frontPublicKeyFilePath!);
    console.log("The front publickey file had been created successfully")   

}

const saveKeyInAFile = (key: string, path: string) => {
    fs.writeFile(`${path}`, key, (err) => {
        if(err) throw err;
    } )
}

export const encryptData = (text: string, iv: Buffer, secretKey: Buffer ) => {
    const dataInBytes = naclUtil.decodeUTF8(text);
    const dataEncoded = nacl.secretbox(dataInBytes, iv, secretKey); 
    return naclUtil.encodeBase64(dataEncoded)
}