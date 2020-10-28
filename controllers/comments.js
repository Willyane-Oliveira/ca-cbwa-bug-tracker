const comments = require('../models/comments')();

 module.exports = () => {
const getAll = async(req, res)=>{
  res.json(await comments.getAllComments(req.params.slug_info));
}

const getOne = async(req, res)=>{
  res.json(await comments.getOneComment(req.params.commentId));
}

   const postComment = async(req, res)=>{
     let slug_info = req.params.slug_info;
     let text = req.body.text;
     let author = req.body.author;

     const result = await comments.addComment(slug_info, text, author);
     res.json(result);
   };

   return{
     getAll,
     getOne,
     postComment
   };
 };