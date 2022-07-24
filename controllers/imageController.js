'use strict'

const db = require('../models/index');
const Image = db.Image;
const Video = db.Video;
const Post = db.Post;
const fs=require('fs')
require('dotenv').config();

//uploading multiple files on db
const upploadImages=async(req,res)=>{
    try{
        req.files.forEach(async (element) => {
            console.log("element psoebno", element.path);
            console.log(element)
            let ext=element.mimetype.split("/")[1]
            console.log(ext)
            if(ext=='mp4'){
                const video=await Video.create({
                    video:element.path,
                    postId:req.params.postId
                })

            }else{
                const image= await Image.create({
                    image:element.path,
                    postId:req.params.postId
                })
            }
        });
        
        return res.status(201).send('Images uploaded successufuly');
    }catch(err){
        return res.status(500).json({
            error:error.message
        })
}}


const getImagesByPostId=async(req,res)=>{
    try{
        const imag=await Image.findAll({
            where:{postId:req.params.postId},
            include:[{
                model:Post
            }]
        })
        if(imag){
            return res.status(200).json(imag);
        }
        return res.status(404).send('slike za ovaj post ne postoje');
    }catch(error){
        return res.status(500).send(error.message);
    }
}
module.exports={
   upploadImages,
   getImagesByPostId
}