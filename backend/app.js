//Importar express
import express from 'express';
import productsRouter from './src/routes/products.js';
import branchesRouter from './src/routes/branches.js';
import employeesRouter from './src/routes/employees.js';
import reviewsRouter from './src/routes/reviews.js';

//Ejecutar express
const app = express();

//Acepta JSON 
app.use(express.json());

//Creamos los endpoints
app.use("/api/products", productsRouter)
app.use("/api/branches", branchesRouter)
app.use("/api/employees", employeesRouter)
app.use("/api/reviews", reviewsRouter)

export default app; 