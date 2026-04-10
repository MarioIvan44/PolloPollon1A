//Importar express
import express from 'express';
import productsRouter from './src/routes/products.js';
import branchesRouter from './src/routes/branches.js';
import employeesRouter from './src/routes/employees.js';
import reviewsRouter from './src/routes/reviews.js';
import customerRouter from './src/routes/customers.js';
import registerCustomerRouter from "./src/routes/registerCostumer.js";
//Importante 
import cookieParser from 'cookie-parser';

//Ejecutar express
const app = express();

//Cookie parser sirve para 
app.use(cookieParser());

//Acepta JSON 
app.use(express.json());

//Creamos los endpoints
app.use("/api/products", productsRouter)
app.use("/api/branches", branchesRouter)
app.use("/api/employees", employeesRouter)
app.use("/api/reviews", reviewsRouter)
app.use("/api/customers", customerRouter)
app.use("/api/registerCustomers", registerCustomerRouter)

export default app; 