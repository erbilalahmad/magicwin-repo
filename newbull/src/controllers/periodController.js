import connection from "../config/connectDB";
import jwt from 'jsonwebtoken'
import md5 from "md5";
import request from 'request';
import e from "express";
require('dotenv').config();



import multer from 'multer';
import path from 'path';

// Multer storage engine setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, 'bar_code.png'); // Use original file name
  }
});

// Initialize multer with storage engine
const upload = multer({ storage: storage });

// Controller function for handling file upload
const changeqrcode = async (req, res) => {
    const auth = req.cookies.auth;
    if (!auth) {
      return res.redirect("/login");
    }
  
    // Use multer middleware to handle file upload
    upload.single('file')(req, res, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading file');
      }
      // File uploaded successfully
      return res.redirect('/admin/manager/settings');
    });
  };
  







const changeperiodget = async(req, res) => {
    return res.render("manage/changeperiod.ejs"); 
}

const changeperiodpost =async (req,res) =>{
    const auth = req.cookies.auth;
    if (!auth) {
        return res.redirect("/login");
    }
    let {game,time,period}=req.body;
    if (game && game === 'wingo' ){
        if (time == '1m')time='wingo' ;
        if (time == '3m') time='wingo3';
        if (time == '5m') time='wingo5';
        if (time == '10m') time='wingo10';
    }
    if (game && game === 'k3' ){
        if (time == '1m')time='1' ;
        if (time == '3m') time='3';
        if (time == '5m') time='5';
        if (time == '10m') time='10';
    }
    if (game && game === '5d' ){
        if (time == '1m')time='1' ;
        if (time == '3m') time='3';
        if (time == '5m') time='5';
        if (time == '10m') time='10';
    }
    if(game && time){

        // const [period] = await connection.query('SELECT period FROM ?? WHERE status = 0 AND game = ? ORDER BY id DESC LIMIT 1', [game, time]);
        try {
            await connection.query('UPDATE ?? SET period = ? WHERE status = 0 AND game = ?', [game, period, time]);
            console.log('Update successful');
        } catch (error) {
            console.error('Error updating period:', error);
        }
        


        // console.log(period[0].period)
        return res.status(200).json({
            status:true
        });
    }else{
        return res.status(200).json({
            status:false
        });
    }

    



}






module.exports = {
    changeperiodget,
    changeperiodpost,
    changeqrcode
}