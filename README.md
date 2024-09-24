# My Bank App por Adrian Gonzalez Orobio ( Backend ) 

A continuación se establecerán los pasos para poder correr la API REST

## Requerimientos.
Se debe contar con: 
* PostgreSql 
* Node version `20.15.1`

## Pasos para la instalación del proyecto.
1. **Clonar repositorio:** Se debe clonar el repositorio desde la página de github o tomando el siguiente enlace:  `https://github.com/AdrianGOT/Haipriority_backend.git` 
    *  También se puede copiar el siguiente comando de consola para poder clocar el repositorio 
  ``` git clone https://github.com/AdrianGOT/Haipriority_backend.git ```

2. **Creación del archivo .env:** Dentro de este archivo se van a encontrar variables como: 
    * **PORT:** Puerto donde va a ser escuchada la aplicación de Express, se debe colocar el puerto **3005**, ya que es este al que está apuntando el Proyecto de frontend.
    
    * **JWT_SECRET_KEY:** Es la clave secreta necesaria para poder utilizar JWT para la creación y validación de tokens. Puede colocar texto aleatorio.

    * **DATABASE_URL:** Es el link que permitirá a la aplicación poder conectarse a la base de datos. El formato para este link es de 
    `postgresql://user:password@localhost:5432/dbName?schema=public`
    * **PUBLIC_KEY_FILE_PATH:** Esta variable sirve para poder determinar donde se va a guardar la llave publica para encriptar los datos. Recomendación personal: `./src/keys/publicKey.pem`.
    * **PRIVATE_KEY_FILE_PATH:** Esta variable sirve para poder determinar donde se va a guardar la llave privada para desencriptar los datos. Recomendación personal: `./src/keys/privateKey.pem`.
    * **FRONT_PUBLIC_KEY_FILE_PATH:** Esta variable sirve para poder determinar donde se va a guardar la llave publica que va a ser enviada desde el front para encriptar los datos enviados desde el backend. Recomendación personal: `./src/keys/frontPublicKey.pem`.
    * **ALGORITHM_ENCODE_SECRET_KEY:** variable encargada de contener el algoritmo para cifrar la información sensible de las tarjetas de credito y de debito. Se utiliza `aes-256-cbc`
    * **SECRET_KEY_PATH:** Variables que determina la ubicación para guardar la secret key para poder encriptar los datos sensibles de las tarjetas de credito y debito. Recomendación: `'./src/keys/frontkey.txt'`
    * **SECRET_IV_PATH:** Variables que determina la ubicación para guardar la iv(initial vector) para poder encriptar los datos sensibles de las tarjetas de credito y debito. Recomendación: `'./src/keys/ivKey.txt'`

3. **Instalar las dependencias necesarias:** Para instalar las dependencias se debe ejecutar el comando: `npm install`.

4. **Migración de la base de datos:** Ejecutar `npx prisma migrate dev --name first` en el root del proyecto para crear las tablas y generar la semilla para los datos necesarios y los datos de prueba.

## Ejecución del proyecto
Ejecutar en el root del proyeto el comando `npm run dev` para comenzar. 