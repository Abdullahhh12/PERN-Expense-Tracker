import express from "express"
import dotenv from "dotenv"
import { initDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionsRoute from  "./routes/transactionsRoute.js"
import cors from "cors";
 
dotenv.config()

const app = express();


// Allow all origins (for development)
app.use(cors({
  origin: 'https://pern-expense-tracker.vercel.app',
  credentials: true
}));

//middleware
app.use(express.json())


const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/transactions",transactionsRoute)



initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);   
  })
})