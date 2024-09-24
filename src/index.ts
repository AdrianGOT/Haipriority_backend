import cors         from "cors";
import helmet       from "helmet";
import dotenv       from "dotenv";
import express      from "express";
import cookieParser from "cookie-parser";

// Routers 
import menuRoutes       from './modules/menu/routes/menu';
import authRoutes       from "./modules/auth/routes/auth";
import loanRoutes       from "./modules/loans/routes/loan";
import configRoutes     from "./modules/config/routes/config";
import clientRoutes     from "./modules/client/routes/client";
import debitCardRoutes  from "./modules/debitCard/routes/debitCard";
import creditCardRoutes from "./modules/creditCard/routes/creditCard";

import { generateKeyToSendFront, managementPairKeys } from './keys/managementKeys';


// ========= Initial configurations ========= 
const app = express();
app.disable('x-powered-by');
app.use( express.json() );
app.use( cors({credentials: true, origin: 'http://localhost:5173'}) )
app.use( cookieParser() )
app.use( helmet())
dotenv.config();


const PORT = process.env.PORT || 3002;

// ========= Routes =========
app.use('/api/auth',authRoutes);
app.use('/api/main',menuRoutes);
app.use('/api/loans',loanRoutes);
app.use('/api/client',clientRoutes);
app.use('/api/config',configRoutes);
app.use('/api/credit-card',creditCardRoutes );
app.use('/api/debit-card',debitCardRoutes);
    

// --------- Listen ---------
app.listen(PORT, () =>{
    managementPairKeys();
    generateKeyToSendFront();
    console.log(`Running the app in ${PORT} port`);
})