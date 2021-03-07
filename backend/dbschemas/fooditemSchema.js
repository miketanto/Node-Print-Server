import mongoose from 'mongoose';
import { propertySchema } from './propertySchema.js';

export const fooditemSchema = mongoose.Schema({
    name: {
        type:String ,
        required:true,
        sparse:true,
    },
    
    unit_price: {
        type:Number ,
        required:true,
    },

    property_types: [propertySchema],

    image_url:{type:String},

    item_category:{
        head: {type:String ,required:true},
        sub: {type:String ,required:true},
    },

    item_availability: {type: Boolean, default:true},
});
