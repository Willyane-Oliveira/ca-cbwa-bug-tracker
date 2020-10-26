const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = ()=>{
  const get = async(issueNumber = null)=>{
    if(!issueNumber){
      const grabAllIssues = await db.get(COLLECTION);
      return grabAllIssues;
    }
    const specificIssue = await db.get(COLLECTION, {issueNumber});
    return specificIssue;
  };

  const fetByProject = async(issueNumber)=>{
    let expression = new RegExp(issueNumber);
    const byProject = await db.get(COLLECTION, {issueNumber: expression});
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