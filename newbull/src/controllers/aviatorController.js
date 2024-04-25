import connection from "../config/connectDB";
import jwt from 'jsonwebtoken'
import md5 from "md5";
import e from "express";
require('dotenv').config();

const showamount=async(req,res)=>{
    try {
        let phone=req.body.phone;
      
        let [udata] = await connection.execute('SELECT `money` FROM `users` WHERE `phone`= ? ',[phone]);
      
        let amount=udata[0].money;
        return res.status(200).json({
            amount: amount,
            status: true
        });
    } catch (error) {
        return res.status(200).json({
            amount: 0,
            status: false
        });
    }
   

}




// aviator bet now
const betnow=async(req,res)=>{
    let usermobile=req.body.mobile;
    let betamount=req.body.betamount;
   
   
    const [userdata]=await connection.execute('SELECT `money` FROM `users` WHERE `phone` = ?',[usermobile]);
    const [playmoney]=await connection.execute('SELECT `playmoney` FROM `users` WHERE `phone`=? ',[usermobile]);
   
    if(betamount > userdata[0].money ){
        return res.status(200).json({
            status:false,
            message:"Insufficient Balanace node"
        });
    }else{
        try {
            
            await connection.execute('UPDATE `users` set `money` = money - ?  WHERE `phone` = ?',[betamount,usermobile]);
            if(playmoney[0].playmoney >= betamount){

                await connection.execute('UPDATE `users` set `playmoney` = playmoney - ?  WHERE `phone` = ?',[betamount,usermobile]);
            }else{
                await connection.execute('UPDATE `users` set `playmoney` = 0  WHERE `phone` = ?',[usermobile]);
            }
            
            return res.status(200).json({
                status:true,
                message:"Bet Placed",
                finalamount:userdata[0].money - betamount 
            });
        } catch (error) {
           
            return res.status(200).json({
                status:false,
                message:"Something Wrong Try again !"
            });
        }
    }
}


const cashout=async (req,res)=>{
    let phone_num=req.body.mobile;
    let cashamount=req.body.cashamount;
    
  
    try {
        const [finalamount]=await connection.execute('SELECT `money` FROM `users` WHERE `phone` = ?  ',[phone_num]);
        await connection.execute('UPDATE `users` set `money` = `money` + ?  WHERE `phone` = ?',[cashamount,phone_num]);
        
        return res.status(200).json({
            status:true,
            message:'done',
            finalamount:finalamount[0].money + cashamount
        })
    } catch (error) {
        return res.status(200).json({
            status:false,
            message:'something wrong node'
        })
    }
}



module.exports={
    showamount,
    betnow,
    cashout
}