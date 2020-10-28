const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = ()=>{
  const get = async(slug_info = null)=>{
    if(!slug_info){
      const grabAllIssues = await db.get(COLLECTION);
      return grabAllIssues;
    }
    const specificIssue = await db.get(COLLECTION, {slug_info});
    return specificIssue;
  };

  const fetByProject = async(slug_info)=>{
    let expression = new RegExp(slug_info);
    const byProject = await db.get(COLLECTION, {slug_info: expression});
    return byProject;
  }

  const add = async(slug_info, title, description, status, project_id)=>{
    const counter = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      slug_info: `${slug_info}-${counter + 1}`,
      title: title,
      description: description,
      status: status,
      project_id: new ObjectID(project_id),
      comments: []
    });

    return results.result;
  }

  return{
    get,
    add,
    fetByProject,
  }
}