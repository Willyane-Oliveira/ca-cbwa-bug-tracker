const issues = require('../models/issues')();

module.exports = () => {
  const fetController = async(req, res) =>{
    res.json(await issues.get());
  };
  const fetByIssue = async(req, res)=>{
   res.json(await issues.get(req.params.slug));
  };

  const fetByProject = async(req, res)=>{
    res.json(await issues.fetByProject(req.params.slug));
   };

  const postController = async(req, res)=>{
    let slug_info = req.params.slug_info;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let project_id = req.body.project_id;

    const result = await issues.add(slug_info, title, description, status, project_id);
    res.json(result);
  };

  return{
    fetController,
    fetByIssue,
    fetByProject,
    postController,
  }
};