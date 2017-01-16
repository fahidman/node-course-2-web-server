const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

const port = process.env.PORT || 9000;
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=(`${now}:== ${req.method}=== ${req.url}`)
  fs.appendFile("server-log.txt",log+'\n',(err)=>{
    if(err)
        console.log('Unable to append to server.log')
  })
  next();
})
// app.use((req,res,next)=>{
//   res.render('maintain.hbs');
//
// })
app.use(express.static(__dirname+'/public'))
hbs.registerHelper('getCurrentYear',()=> 2016)
hbs.registerHelper('screamIt',(text)=> text.toUpperCase())
// app.get('/',(req,res)=>{
//   // res.send("<h1>Welcome to my first web app</h1>")
//   res.send({
//     name: "Andrew",
//     class: "XII -F",
//     age: "67",
//     profession: "teacher"
//
//   })
// })
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page2',
    welcomeMessage: "Welcome to my About site"

  })
})
app.get('/profile',(req,res)=>{
  res.render('profile.hbs',{
    pageTitle: 'Portfolio',
      welcomeMessage: "Welcome to my site"
  })
})
app.get('/bad',(req,res)=>{
  res.send({
    error_code: 404,
    error_message: "Content Not Found"

  })
})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my site"

  })
})
app.listen(port,()=>{
  console.log("Server is started at",port )
})
