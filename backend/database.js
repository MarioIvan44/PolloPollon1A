//Importamos el ORM de la base de datos MongoDB, que es Mongoose, y la configuración de la base de datos desde el archivo config.js para establecer la conexión con MongoDB utilizando las variables de entorno definidas en el archivo .env.
import mongoose from "mongoose";
import { config } from "./config.js";

//Conectamos a la base de datos utilizando Mongoose y la URI de conexión obtenida de la configuración. Esto permite que nuestra aplicación se comunique con la base de datos MongoDB
mongoose.connect(config.db.URI)

//Crea una constante que es igual a la conexión de Mongoose, lo que nos permite manejar eventos relacionados con la conexión a la base de datos, como errores o confirmaciones de conexión exitosa.
const connection = mongoose.connection;

//Si la base de datos se conecta correctamente, se ejecuta el evento "open" y se muestra un mensaje en la consola indicando que la conexión a la base de datos fue exitosa. Si ocurre un error durante la conexión, se captura el error y se muestra un mensaje en la consola con los detalles del error. 
connection.once("open", () => {
    console.log("DB is connected");
})

//Si la base de datos se desconecta, se ejecuta el evento "disconnected" y se muestra un mensaje en la consola indicando que la conexión a la base de datos se ha perdido
connection.on("disconnected", () => {
    console.log("DB is disconnected");
});

//Si ocurre un error durante la conexión, se captura el error y se muestra un mensaje en la consola con los detalles del error.
connection.on("error", (err) => {
    console.log("Error connecting to the database:", err);
});

