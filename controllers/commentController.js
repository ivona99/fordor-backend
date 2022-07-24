'use strict'

const db = require('../models/index');
const Comment = db.Comment;
require('dotenv').config();
const Post = db.Post;

const addComment = async (req,res) => {
    try {
        const comment = await Comment.create({
            postId:req.params.postid,
            komentar:req.body.komentar
        });
        return res.status(201).json(comment);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
const getAllCommentsByPost=async(req, res)=>{
    try{
        const comment=await Comment.findAll({
            offset: req.params.offset,
            limit: 21,
            where: {postId: req.params.postid},
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json(comment);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const deleteComment= async (req,res) => {
    try {
        const deleted = await Comment.destroy({
            where: {postId: req.body.postId,
            id:req.body.id}
        });
        if(deleted){
            return res.status(200).send('comment deleted');
        }
        return res.status(500).send('comment not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports={
    addComment,
    getAllCommentsByPost,
    deleteComment
}