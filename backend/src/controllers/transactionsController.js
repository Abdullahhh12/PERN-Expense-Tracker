import { sql } from "../config/db.js";

export async function createTransactions(req,res){
        try {
            const{title,user_id,amount,category} = req.body;
    
            if(!title || !category || !user_id || amount === undefined){
                return res.status(400).json({message:"All fields required"})
            }
    
            const transaction = await sql`
            INSERT INTO transactions(user_id,title,amount,category)
            VALUES (${user_id},${title},${amount},${category})
            RETURNING *
            `
            console.log(transaction);
            res.status(200).json(transaction[0])
           
        } catch (error) {
            console.log("error in creating transaction",error);    
            res.status(500).json({message:"Internal server error"})
        }
    }
 

export async function deleteTransaction(req,res){
         try {
              const {id} = req.params;
      
              if(isNaN(parseInt(id))){
                  return res.status(400).json({message:"Invalid Transaction Id"})
              }
              const result = await sql`
                 DELETE FROM transactions WHERE id = ${id} 
                 RETURNING *
                 `
      
              if (result.length===0) {
                 return res.status(404).json({message:"Transaction not found"})
              }
      
              res.status(200).json({message:"Transaction deleted successfully"})
              
          } catch (error) {
              console.log("Error deleting the transaction",error);  
              res.status(500).json({message:"Internal server error"})
          }
                   
      }    

export async function getTransactionById(req,res){
        try {
            const {user_id} = req.params;
            const transactions = await sql`
               SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
                `;
            res.status(200).json(transactions)
            
        } catch (error) {
            console.log("Error getting transactions",error);  
            res.status(500).json({message:"Internal server error"})
        }
       
    }  


export async function getTransactionSummary(req,res){
        try {
            const {user_id} = req.params;
    
            const balanceResult = await sql`
            SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${user_id} 
            `
            const incomeResult = await sql`
            SELECT COALESCE(SUM(amount),0) as income FROM transactions 
            WHERE user_id = ${user_id} AND amount > 0
            `
            const expenseResult = await sql`
            SELECT COALESCE(SUM(amount),0) as expense FROM transactions 
            WHERE user_id = ${user_id} AND amount < 0
            `
    
            res.status(200).json({
                balance:balanceResult[0].balance,
                income:incomeResult[0].income,
                expense:expenseResult[0].expense,
    
            })
            
        } catch (error) {
              console.log("Error getting transactions summary",error);  
            res.status(500).json({message:"Internal server error"})
            
        }
    }
    