//Config es un archivo intermedio que se encarga de cargar las variables de entorno desde el archivo .env y exportar la configuración de la base de datos para que pueda ser utilizada en otros archivos, como database.js, donde se establece la conexión con MongoDB utilizando Mongoose.

import dotenv from 'dotenv';

//Ejecutamos la libreria dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

//Exportamos la configuración de la base de datos, que se obtiene de las variables de entorno de .env
export const config = {
    db:{
        URI: process.env.DB_URI
    }
}