const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const Review =require('../models/review')
const {campgroundSchema,reviewSchema} = require('../schemas.js')

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
    
//router.get('/',(req,res)=>{
    //res.send("Hello from 3000");
 /////   })
 

    
    router.get('/',async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds}) 
    })
    router.get('/new',(req,res)=>{
        res.render('campgrounds/new')
    })
    router.post('/',  async (req,res,next)=>{
     
            const campground = new Campground(req.body.campground);
        await campground.save();
        //req.flash('success','Successfully created bro!');
        res.redirect(`/campgrounds/${campground._id}`);
        
    })
    router.get('/:id', async(req,res)=>{
       const campground = await Campground.findById(req.params.id).populate('reviews')
    
       res.render('campgrounds/show',{campground})
    })
    
    router.get('/:id/edit',async(req,res)=>{
      const campground = await Campground.findById(req.params.id)
      res.render('campgrounds/edit',{campground})
    })
   router.put('/:id',async(req,res)=>{
        const {id} = req.params;
       const campground = await  Campground.findByIdAndUpdate(id,{...req.body.campground})
        res.redirect(`/campgrounds/${campground._id}`)
    })
    router.delete('/:id',async(req,res)=>{
    const {id}= req.params;
     await Campground.findByIdAndDelete(id)
     res.redirect('/campgrounds')
    })

    module.exports = router