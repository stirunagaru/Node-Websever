const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
 var app = express();

 hbs.registerPartials(__dirname+'/views/partials');

 app.set('view engine', 'hbs');



 app.use((req, res, next)=>{
   var now = new Date().toString();
   var log = `${now} : ${req.method} ${req.url}`;

   console.log(log);
   fs.appendFile('server.log',log +'\n', (err)=>{if(err) {console.log('unable to find server.log file'); }});
   next();
 });

 // app.use((req, res,next)=>{
 //   res.render('maintenance.hbs');
 // });

 app.use(express.static(__dirname + '/public'));

 hbs.registerHelper('getCurrentYear', ()=>{ //functionname, function
   return new Date().getFullYear();
 });

 hbs.registerHelper('UpperCase', (text) => {
  return text.toUpperCase();
});

 app.get('/', (req, res) => {
   //res.send('<h1> <i> Hello</i>  :) </h1>');
   res.render('home.hbs',{
     headTitle: 'Home',
     message: 'Welcome to The Home Page',
     pageTitle: 'Home Page',
     currentYear: new Date().getFullYear()
   });
 });





 app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res) =>{
  res.send({errorStatus : 'Code: 404 ERROR!'});
});
app.listen(port, ()=>{
console.log(`server is up and running on port: ${port}`);
});
