const mongoose = require('mongoose');
//const { campgroundSchema } = require('../schemas');
const review = require('./review');
const Schema = mongoose.Schema;
const CampgoundSchema = new Schema({
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'
    }]
});
CampgoundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await review.remove({
             _id :{ $in : doc.reviews} 
        })
    }
})
module.exports = mongoose.model('Campground',CampgoundSchema)

