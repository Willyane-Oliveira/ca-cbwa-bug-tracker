const projects = require('../models/projects')();

 module.exports = () => {
   const fetController = async(req, res) =>{
    const{slug, error} = await projects.get();
    
    if(error){
      res.status(500).json({error});
    }
    res.json(slug);
   };
   const fetBySlug = async(req, res)=>{
    const{slug, error} = await projects.get(req.params.slug)
    if(error){
      res.status(500).json({error});
    }
    res.json(slug);
   };
  

   const postController = async(req, res)=>{
    let slug = req.body.slug; 
    let name = req.body.name;
    let description = req.body.description;

     const {results, error} = await projects.add(slug, name, description);
     console.log(error)
     if(error){
      res.status(500).json(error);
    }
     res.json(results);
   };

   return{
     fetController,
     postController,
     fetBySlug,
   }
 };