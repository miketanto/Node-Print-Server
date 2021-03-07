import mongoose from 'mongoose';
import {fooditemSchema} from './fooditemSchema.js';
import {orderItemSchema} from './orderItemSchema.js';
export const customeruserSchema = mongoose.Schema({
    alias_name: {
        type:String ,
        required:true,
    },
    customer_user_total: {
        type:Number ,
        default:0,
    },
    fooditems:[orderItemSchema]
});

