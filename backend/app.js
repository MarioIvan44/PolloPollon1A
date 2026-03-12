//Importar express
import express from 'express';
import { use } from 'react';
import productsRouter from './src/routes/products.js';

//Ejecutar express
const app = express();

//Creamos los endpoints
app.use("/api/products", productsRouter)

export default app;