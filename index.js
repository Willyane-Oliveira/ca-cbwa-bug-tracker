const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controllers/users')();
const app = (module.exports = express());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.get('/users', users.fetController);
app.get('/users/:email', users.fetByEmail);
app.post('/users', users.postController);

app.get('/',(req, res)=>{
  res.send('Hello World');
})

app.listen(port, hostname, ()=>{
  console.log(`App listening at http://${hostname}:${port}`);
});