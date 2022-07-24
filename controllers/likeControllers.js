// 'use strict'

// const db = require('../models/index');
// const Like = db.Like;
// require('dotenv').config();


// const getLikesByPost = async (req,res) => {
//     try {
//         const like = await Like.findOne({
//             where: {postId: req.params.postid},
//             include: [{
//                 model: Post
//             }]
//         });
//         if(like){
//             return res.status(200).json(like);
//         }
//         return res.status(404).send('Like with the specified question id does not exists');
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }

    
// }
// const addLike = async (req,res) => {
//     try {
//         const like = await Like.create(req.body);
//         return res.status(201).json(like);
//     } catch (err) {
        
//     }
// };

// const deleteLike= async (req,res) => {
//     try {
//         const deleted = await Like.destroy({
//             where: {id: req.params.id}
//         });
//         if(deleted){
//             return res.status(200).send('Like deleted');
//         }
//         return res.status(500).send('Like not found');
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// };
// module.exports={
// getLikesByPost,
// addLike,

// deleteLike
// }