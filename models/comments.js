const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
  const getAllComments = async (slug_info) => {
    try {
      const PIPELINE = [
        { $match: { "slug_info": slug_info } },
        {
          $project: {
            comments: 1,
            _id: 0,
            slug_info: 1
          }
        }
      ]
      const getComments = await db.aggregate(COLLECTION, PIPELINE);
      return { getComments };

    } catch (err) {
      return {
        error: err,
      }
    }
  };

  const getOneComment = async (commentId) => {
    try {
      const PIPELINE = [
        { $match: { 'comments._id': ObjectID(commentId) } },
        {
          $project: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: { $eq: ['$$comment._id', ObjectID(commentId)] }
              }
            },
            _id: 0,
            slug_info: 1
          }
        }
      ]

      const comments = await db.aggregate(COLLECTION, PIPELINE);
      return {comments};

    } catch (err) {
      return {
        error: err,
      }
    }
  }

  const addComment = async (slug_info, text, author) => {
    try{
    const PIPELINE = [{ slug_info: slug_info },
    {
      $push: {
        comments: {
          _id: new ObjectID(),
          text: text,
          author: author
        }
      }
    }]

    const results = await db.update(COLLECTION, PIPELINE);
    return {results};

  } catch (err) {
    return {
      error: err,
    }
  }
  }

  return {
    getAllComments,
    getOneComment,
    addComment,
  }
}