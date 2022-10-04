const express = require('express')
const app = express();
const shelterRoutes = require('./routes')
//const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
app.use(session({secret:'sakthi',resave:false,saveUninitialized:false}))
app.use(flash())
app.use('/',shelterRoutes)
app.set('view engine','ejs')

app.get('/oped',(req,res)=>{
    //if(req.session.count){
      //  req.session.count+=1
    //}
    //else{
      //  req.session.count =1
    //}
    req.flash('info','hacked successfully')
    res.redirect('/register')
    //res.send(`This is the ${req.session.count} time`)
   

})
app.use((req,res,next)=>{
    res.locals.messages = req.flash('danger')
    next()
})
app.get('/register',(req,res)=>{
    const {username='Anonymous'} = req.query
    req.session.username = username
    res.render('router',{messages:req.flash('danger')})
    //res.redirect('/poked')
})
app.get('/poked',(req,res)=>{
    const {username} = req.session
    res.send(`Hey there!,${username}`)
})
app.listen(3000,(req,res)=>{
    console.log("Finely tunned!")
})