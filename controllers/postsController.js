'use strict'

const db = require('../models/index');
const imageControllers = require('../controllers/imageController');
const Post = db.Post;
const Image = db.Image;
const Video = db.Video;
require('dotenv').config();
const sequelize = require('sequelize');

//creating a post with one image
const createPost=async(req, res)=>{
    console.log(req);
    try{
        //console.log(req.files.length);
            const post=await Post.create({
                ime:req.body.ime,
                slika:req.file.path,
                opis:req.body.opis,
                lng:req.body.lng,
                lat:req.body.lat,
                seen:req.body.seen,
                odobreno:req.body.odobreno,
                vrsta:req.body.vrsta,
                naslov:req.body.naslov,
                kategorija:req.body.kategorija,
                    
            });
            console.log(post.id)
            return res.status(201).json({post});
    }catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}
//getting all posts
const getPosts=async(req,res)=>{
    try{
        const posts = await Post.findAll({
        });
        if(posts){
            return res.status(200).json(posts);
        }
        return res.status(404).send('Postovi ne postoje');
    }catch(error){
        return res.status(500).send(error.message);
    }
}
//deleting post by id
const deletePost=async(req,res)=>{
    try{
        const deletedPost = await Post.destroy({
            where: {id: req.params.id}
        });
        if(deletedPost){
            return res.status(200).send('Post deleted');
        }
        return res.status(500).send('Post with this id is not found');

    }catch(error){
      return res.status(500).send(error.message);
    }
} 
//approving the application form from users
const odobri=async(req,res)=>{
    try{
        console.log(req.params.id)
        var post = await Post.findOne({
            where: {id: req.params.id}
        });
        post.set({
            odobreno:req.body.odobreno
        })
       var result=await post.save();
        if(result){
            const updatedPost = await Post.findOne({where: {id: req.params.id}});
            return res.status(200).json(updatedPost);
        }
        return res.status(500).send('Post not found');
    }catch(error){
        return res.status(500).send(error);
    }
}
//geting the post by specific id
const getPostById=async(req,res)=>{
    try{
        const post = await Post.findOne(
            {
            where: {id:req.params.id,
            odobreno:true},
        });
        if(post){
            return res.status(200).json(post);
        }
        return res.status(404).send('Post s ovim specifikacijama ne postoji');
    }catch(err){
        return res.status(500).send(err.message);
    }
}
//increseng seen value after a user presses on a post
const increseSeen=async(req,res)=>{
    try{
        const post = await Post.findOne(
            {
            where: {id:req.params.id},
        });
        var result=post.increment('seen');
        if(result){
            const updatedPost = await Post.findOne({where: {id: req.params.id}});
            return res.status(200).json(updatedPost);
        }
        return res.status(500).send('Post not found');
    }catch(err){
        return res.status(500).send(err.message);
    }
}
//getting all the posts by specific category
const getPostsByVrsta=async(req,res)=>{
    try{
        const posts = await Post.findAll({
            where:{kategorija:req.params.vrsta},
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if(posts){
            return res.status(200).json(posts);
        }
        return res.status(404).send('Postovi ne postoje');
    }catch(error){
        return res.status(500).send(err.message);
    }
}

const getPostsByKategorija=async(req,res)=>{
    try{
        const posts = await Post.findAll({
            where:{
                kategorija: req.params.kategorija,
                odobreno:false
              },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if(posts){
            return res.status(200).json(posts);
        }
        return res.status(404).send('Postovi ne postoje');
    }catch(error){
        return res.status(500).send(error.message);
    }
}
//get posts wit most views
const getMostViewd = async (req,res) => {
    try {
        const post= await Post.findAll({
            
            order: [
                ['seen', 'DESC']
            ]
        });
        if(post){
            return res.status(200).json(post);
        }
        return res.status(404).send('There are no approved posts');
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

//getting a post by specific category and type(subcategory)
const getPostsByKategorijaVrsta=async(req,res)=>{
    try{
        const posts = await Post.findAll({
            where:{
                kategorija: req.params.kategorija,
                vrsta: sequelize.where(sequelize.fn('LOWER', sequelize.col('vrsta')), 'LIKE', '%' + req.params.vrsta.toLowerCase() + '%')
              },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if(posts){
            return res.status(200).json(posts);
        }
        return res.status(404).send('Postovi ne postoje');
    }catch(error){
        return res.status(500).send(error.message);
    }
}


module.exports = {
   createPost,
   getPosts,
   deletePost,
   odobri,
   getPostById,
   increseSeen,
   getMostViewd,
   getPostsByVrsta,
   getPostsByKategorija,
getPostsByKategorijaVrsta,
}