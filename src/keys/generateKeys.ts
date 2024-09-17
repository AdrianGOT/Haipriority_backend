import fs from "fs";
import crypto from "crypto";

const publicKeyFilePath = process.env.PUBLIC_KEY_FILE_PATH;
const privateKeyFilePath = process.env.PRIVATE_KEY_FILE_PATH;

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
    fs.writeFile(`${publicKeyFilePath}`, publicKey, (err) => {
        if(err) throw err;
    } )
    fs.writeFile(`${privateKeyFilePath}`, privateKey, (err) => {
        if(err) throw err;
    } )
    
}