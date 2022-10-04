const express = require('express');
const app = express();
const methodOverride = require('method-override')
const path = require('path')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const campgrounds = require('./routes/campground')
const reviews = require('./routes/reviews')
const Review =require('./models/review')
const session = require('express-session')
const flash = require('connect-flash')

const Joi = require('joi')
const {campgroundSchema,reviewSchema} = require('./schemas.js')
//const ExpressError = require('./utils/ExpressError')

app.engine('ejs',ejsMate)
const Campground = require('./models/campground');
const { join } = require('path');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;

db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected")
});
const validateReview=(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body)
    if(error){
        console.log(error)
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,404)
    }else{
        next()
    }
}
//const validateCampground = (req,res,next)=>{
    //const {error} = campgroundSchema.validate(req.body)
    //if(error){
        //const msg = error.details.map(el=>el.message).join(',')
      //  throw new ExpressError(msg,404)
    //}
    //else{
    //    next()
  //  }
//
//}


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/campgrounds',campgrounds)
app.use('/campgrounds',reviews)
app.use(session({secret:'okdonsafae',
resave:false,saveUninitialized:true,
cookie:
{
    httpOnly:true,
    expires:Date.now() +1000*60*60*24*7,
    maxAge:1000*60*60*24*7
}}))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    next();
})

       
app.all('*',(req,res,next)=>{
    next( new ExpressError('Page not found',404))
})
app.use((err,req,res,next)=>{
    if(!err.message) err.message('Something beats me')
    res.render('error',{err});
    
})
app.listen(3000,(req,res)=>{
    console.log("Serving sir!");
})