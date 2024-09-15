import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routers 
import authRoutes from "./auth/routes/auth";
import creditCardRoutes from "./creditCard/routes/creditCard";
import debitCardRoutes from "./debitCard/routes/debitCard";
import loanRoutes from "./loans/routes/loan";
import clientRoutes from "./client/routes/client";
import menuRoutes from './menu/routes/menu';


// ========= Initial configurations ========= 
const app = express();
app.disable('x-powered-by');
app.use( express.json() );
app.use( cors({credentials: true, origin: 'http://localhost:5173'}) )
app.use( cookieParser() )
dotenv.config();


const PORT = process.env.PORT || 3002;

// ========= Routes =========
app.use('/api/auth', authRoutes);
app.use('/api/credit-card', creditCardRoutes );
app.use('/api/debit-card', debitCardRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/main', menuRoutes);


// --------- Listen ---------
app.listen(PORT, () =>{
    console.log(`Running the app in ${PORT} port`);
})