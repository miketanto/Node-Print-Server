import mongoose from 'mongoose';
import {fooditemSchema} from './fooditemSchema.js';

export const orderItemSchema = mongoose.Schema({
        item: fooditemSchema,
        quantity:{type:Number,default: 1 },
        selected_properties:{},
        item_notes: {type:String},
        item_status: {type:String, default:'Open'}
});

