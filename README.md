# Project Name
> Bug Tracking System

## What the project does
The Bug Tracking System keeps track of of capturing, reporting, and managing data on bugs that occur in software.

## Setup
An API was created to manage data inclusion errors. The project can seen through the following link: https://github.com/Willyane-Oliveira/ca-cbwa-bug-tracker

## Technologies
* nodejs
* expressjs
* mongodb on Atlas
* Deployed on Heroku
* Code in Github

## Code Examples
Controllers and Models to manage users, projects and issues was developed.
The bug management is done through routes that post or get data. For exampe:

app.post('/users', users.postController); //Add new users individually
app.get('/users', users.fetController); //Get all users
app.get('/users/:email', users.fetByEmail); //Get individual users by email

app.post('/projects', projects.postController); //Add new projects individually
app.get('/projects', projects.fetController); //Get all projects
app.get('/projects/:slug', projects.fetBySlug); //Get individual projects by Project Slug

app.post('/projects/:slug_info/issues', issues.postController); //Add issues to a project
app.get('/issues', issues.fetController); //Get all issues
app.get('/issues/:slug', issues.fetByIssue); //Get individual issues
app.get('/projects/:slug_info/issues', issues.fetByProject); //Get all issues for a project

app.post('/issues/:slug_info/comments', comments.postComment); //Add new comments to an issue
app.get('/issues/:slug_info/comments', comments.getAll); //Get all comments for an issues
app.get('/issues/:slug_info/comments/:commentId', comments.getOne); //Get individual comments for an issues

## Status
Project is in progress because when I learn more about programming I will be able to increment this project like a professional project.

## Inspiration
Project inspired by David Albert who is a lecture from CCT Dublin. He challenged us to develop a great project as a Continuous Assignment (CA), which could impress any employeer.

## Contact
Created by [@Willyane-Oliveira](https://github.com/Willyane-Oliveira) - feel free to contact me!