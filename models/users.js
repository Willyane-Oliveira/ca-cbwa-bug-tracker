const db = require('../db')();
const COLLECTION = 'users';

module.exports = ()=>{
  const get = async(email = null)=>{
    if(!email){
      const grabAllUsers = await db.get(COLLECTION);
      return grabAllUsers;
    }
    const specificUser = await db.get(COLLECTION, {email});
    return specificUser;
  };

  const add = async(name, email, usertype, key)=>{
    const results = await db.add(COLLECTION, {
      name: name,
      email: email,
      usertype: usertype,
      key: key,
    });

    return results.result;
  }

  return{
    get,
    add,
  }
}