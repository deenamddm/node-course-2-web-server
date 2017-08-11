var express = require ('express');
var hbs = require ('hbs');
var app=express();
var fs = require ('fs');
const port = process.env.PORT || 3000;

app.set ('view engine',hbs);
hbs.registerPartials(__dirname + '/views/partials');
app.use (express.static(__dirname + '/public'));  // to use help.html. In browser-localhost:3000/help.html

app.use ((req,res,next)=>{
var now = new Date().toString();
var log = (`${now} : ` + ' Method : ' + req.method + ' url : ' + req.url);
//  var log = `${now} : ${req.method}  ${req.url}`;//  btoh valid
fs.appendFile ('log-file',log + '\n', (error)=>{
  if (error) {
    console.log ('Unable to write to file');
  }
});
next();
});

// To print page under maintenance
// app.use ((req, res, next)=>{
//  res.render ('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear' , ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper ('boldIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  res.render ('home.hbs',{
    pageTitle : 'Home Page',
    welcome : 'Welcome to the Home Page'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page',
    });
});

app.get('/Error', (req,res) => {
  res.send ({
    Error : 'Unable to get data'
  });
});

app.listen(port,()=>{
  console.log (`server is up on ${port}`);
});
