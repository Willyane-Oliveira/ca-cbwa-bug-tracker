const comments = require('../models/comments')();

module.exports = () => {
  //Get all comments
  const getAll = async (req, res) => {
    const { getComments, error } = await comments.getAllComments(req.params.slug_info);
    if (error) {
      res.status(500).json({
        error,
      })
    }
    res.json(getComments);
  }
  //Get one comment
  const getOne = async (req, res) => {
    const { comments, error } = await comments.getOneComment(req.params.commentId);
    if (error) {
      res.status(500).json({
        error,
      })
    }
    res.json(comments);
  }
  //Add a comment
  const postComment = async (req, res) => {
    let slug_info = req.params.slug_info;
    let text = req.body.text;
    let author = req.body.author;

    const { results, error } = await comments.addComment(slug_info, text, author);
    if (error) {
      res.status(500).json({
        error,
      })
    }
    res.json(results);
  };

  return {
    getAll,
    getOne,
    postComment
  };
};