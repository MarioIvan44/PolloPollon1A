import app from "./app.js";

//Creo la función
//Que se encarga de ejecutar el servidor

//Utilizo un bloque try-catch para manejar cualquier error que pueda ocurrir al iniciar el servidor. Si el servidor se inicia correctamente, se muestra un mensaje en la consola indicando que el servidor está escuchando en el puerto 4000. Si ocurre un error, se captura y se muestra un mensaje de error en la consola con los detalles del error.
async function main() {
    try {
        app.listen(4000);
        console.log("Servidor escuchando en el puerto 4000");
        //Todo funciona
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

//Llamo a la función main para iniciar el servidor
main();