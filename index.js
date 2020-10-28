const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

const app = (module.exports = express());

const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

app.use(bodyParser.json());

app.post('/users', users.postController); //Add new users individually
app.get('/users', users.fetController); //Get all users
app.get('/users/:email', users.fetByEmail); //Get individual users

app.post('/projects', projects.postController); //Add new projects individually
app.get('/projects', projects.fetController); //Get all projects
app.get('/projects/:slug', projects.fetBySlug); //Get individual projects

app.post('/projects/:slug_info/issues', issues.postController); //Add issues to a project
app.get('/issues', issues.fetController); //Get all issues
app.get('/issues/:slug', issues.fetByIssue); //Get individual issues
app.get('/projects/:slug_info/issues', issues.fetByProject); //Get all issues for a project

app.post('/issues/:slug_info/comments', comments.postComment); //Add new comments to an issue
app.get('/issues/:slug_info/comments', comments.getAll); //Get all comments for an issues
app.get('/issues/:slug_info/comments/:commentId', comments.getOne); //Get individual comments for an issues

app.get('/',(req, res)=>{
  res.send('Hello World modified');
})

app.listen(port, hostname, ()=>{
  console.log(`App listening at http://${hostname}:${port}`);
});