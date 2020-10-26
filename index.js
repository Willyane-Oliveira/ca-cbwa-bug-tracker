const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

const app = (module.exports = express());

const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();

app.use(bodyParser.json());

app.get('/users', users.fetController);
app.get('/users/:email', users.fetByEmail);
app.post('/users', users.postController);

app.get('/projects', projects.fetController);
app.get('/projects/:slug', projects.fetBySlug);
app.post('/projects', projects.postController);

app.get('/issues', issues.fetController);
app.get('/issues/:slug', issues.fetByIssue);
app.get('/projects/:slug/issues', issues.fetByProject);
app.post('/projects/:slug_info/issues', issues.postController);


app.get('/',(req, res)=>{
  res.send('Hello World modified');
})

app.listen(port, hostname, ()=>{
  console.log(`App listening at http://${hostname}:${port}`);
});