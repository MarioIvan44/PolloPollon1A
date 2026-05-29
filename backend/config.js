//Config es un archivo intermedio que se encarga de cargar las variables de entorno desde el archivo .env y exportar la configuración de la base de datos para que pueda ser utilizada en otros archivos, como database.js, donde se establece la conexión con MongoDB utilizando Mongoose.

import dotenv from 'dotenv';

//Ejecutamos la libreria dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

//Exportamos la configuración de la base de datos, que se obtiene de las variables de entorno de .env
//Se exporta la constante config por nombre para que pueda ser importada en otros archivos utilizando destructuring, como se hace en database.js con la línea: import { config } from "../config.js";
export const config = {
    db:{
        URI: process.env.DB_URI
    },
    JWT: {
        secret: process.env.JWT_Secret_key
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    },
    cloudinary: {
        cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
    },
    wompi: {
        grant_type: process.env.GRANT_TYPE,
        audience: process.env.AUDIENCE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }
}