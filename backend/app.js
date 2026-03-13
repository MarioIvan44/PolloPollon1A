//Importar express
import express from 'express';
import productsRouter from './src/routes/products.js';
import branchesRouter from './src/routes/branches.js';

//Ejecutar express
const app = express();

//Acepta JSON 
app.use(express.json());

//Creamos los endpoints
app.use("/api/products", productsRouter)
app.use("/api/branches", branchesRouter)

export default app;