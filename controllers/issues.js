const issue = require('../models/issues')();

module.exports = () => {
  const fetController = async(req, res) =>{
    const {issues, error} = await issue.get();
    if(error){
      res.status(500).json({
        error,
      })
    }
    res.json(issues);
  };
  const fetByIssue = async(req, res)=>{
    const {issues, error} = await issue.get(req.params.slug);
    if(error){
      res.status(500).json({
        error,
      })
    }
    res.json(issues);
  };

  const fetByProject = async(req, res)=>{
    const {byProject, error} = await issue.fetByProject(req.params.slug_info);
    if(error){
      res.status(500).json({
        error,
      })
    }
    res.json(byProject);
   };

  const postController = async(req, res)=>{
    let slug_info = req.params.slug_info;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let project_id = req.body.project_id;

    const {results, error} = await issue.add(slug_info, title, description, status, project_id);
    console.log(error)
    if(error){
      res.status(500).json({
        error,
      })
    }
    res.json(results);
  };

  return{
    fetController,
    fetByIssue,
    fetByProject,
    postController,
  }
};