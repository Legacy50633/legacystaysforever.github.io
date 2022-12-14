const express = require('express')
const router = express.Router();
const Review =require('../models/review')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
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
    
router.post('/:id/reviews', validateReview,async(req,res)=>{
    const campground = await Campground.findById(req.params.id) 
const review = new Review(req.body.review)
campground.reviews.push(review);
await review.save();
await campground.save()
res.redirect(`/campgrounds/${campground._id}`)
   })
router.delete('/:id/reviews/:reviewId',async(req,res)=>{
const {id,reviewId} = req.params;
await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
await Review.findByIdAndDelete(reviewId)
res.redirect(`/campgrounds/${id}`)

}) 
module.exports = router