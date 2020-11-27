const db = require('../db')();
const COLLECTION = 'users';
const nodemailer = require("nodemailer");
const sendEmail = process.env.EMAIL;
const sendPassword = process.env.PASSWORD;

module.exports = ()=>{
  const get = async(email = null)=>{
    try{
    if(!email){
      const user = await db.get(COLLECTION);
      return {user};
    }
    const user = await db.get(COLLECTION, {email});
    return {user};

    }catch(err){
      return{
        error: err,
      };
    }
  };

  const add = async(name, email, usertype, key)=>{
    //No items can be added without all fields
    if(!name || !email || !usertype || !key){
      return{
        error: "Give all fields, please"
      }
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: sendEmail, // generated ethereal user
        pass: sendPassword, // generated ethereal password
      },
      tls:{
        rejectUnauthorized: false,
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'cloud.main.ca@gmail.com', // sender address
      to: 'willyane.casoly@gmail.com', // list of receivers
      subject: 'Test', // Subject line
      text: 'Welcome to Bug Tracking System', // plain text body
      html: '<b>Hello Bug Tracking System</b>', // html body
    });
  
    console.log("Message sent: %s", info.messageId);

    try{
      const user = await db.get(COLLECTION, {
        email,
      });
      //Users cannot be duplicated (based on email)
      if (user.length > 0) {
        return {
          error: 'User already exist',
        };
      }

    const results = await db.add(COLLECTION, {
      name: name,
      email: email,
      usertype: usertype,
      key: key,
    });

    return {results};
  }catch(err){
    console.log(err);
    return{
      error: err,
    };
  }
  };

  const getByKey = async(key)=>{
    if(!key){
      console.log('01: missing key');
      return null;
    }
    try{
    const users = await db.get(COLLECTION, {key});
    console.log(users)
    if (users.length !== 1){
      console.log('02: wrong key');
      return null;
    }

    return users[0];
  }catch(err){
    console.log(err);
    return{
      error: err,
    };
  }
  };

  return{
    get,
    add,
    getByKey
  }
}