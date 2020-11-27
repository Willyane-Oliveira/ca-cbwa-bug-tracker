const db = require('../db')();
const COLLECTION = 'projects';

module.exports = ()=>{
  const get = async(slugName = null)=>{
    try{
    if(!slugName){
      const slug = await db.get(COLLECTION);
      return {slug};
    }
    const slug = await db.get(COLLECTION, {slug: slugName});
    return {slug};
    }catch(err){
      console.log(err);
      return{
        error: err,
      }
    }
  };

  const add = async(slug, name, description)=>{
    //No items can be added without all fields
    if(!slug || !name || !description){
      return{
        error: "Give all fields, please"
      }
    }
    try{
      const slugInfo = await db.get(COLLECTION, {slug });
      //Projects cannot be duplicated (based on SLUG)
      if(slugInfo.length > 0){
        return {
          error: 'Project already exist',
        }
      }

    const results = await db.add(COLLECTION, {
      slug: slug,
      name: name,
      
      description: description,
    });

    return {results};

  }catch(err){
    console.log(err);
    return{
      error: err,
    }
  }
  };

  return{
    get,
    add,
  }
}