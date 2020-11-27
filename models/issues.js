const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
  const get = async (slug_info = null) => {
    try {
      if (!slug_info) {
        const issues = await db.get(COLLECTION);
        return { issues };
      }
      const issues = await db.get(COLLECTION, { slug_info });
      return { issues };
    } catch (err) {
      return {
        error: err,
      }
    }
  };

  const fetByProject = async (slug_info) => {
    let expression = new RegExp(slug_info);

    try {
      const byProject = await db.get(COLLECTION, { slug_info: expression });
      return { byProject };
    } catch (err) {
      return {
        error: err,
      }
    }
  }

  const add = async (slug_info, title, description, status, project_id) => {
    //No items can be added without all fields
    if(!slug_info || !title || !description || !status || !project_id){
      return{
        error: "Give all fields, please"
      }
    }
    try {
      const counter = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        slug_info: `${slug_info}-${counter + 1}`,
        title: title,
        description: description,
        status: status,
        project_id: new ObjectID(project_id),
        comments: []
      });

      return {results};
    } catch (err) {
      return {
        error: err,
      }
    }
  }

  return {
    get,
    add,
    fetByProject,
  }
}