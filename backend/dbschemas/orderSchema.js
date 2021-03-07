import mongoose from 'mongoose';
import {customeruserSchema} from './customeruserSchema.js';

export const orderSchema = mongoose.Schema({
    ticketNote :{type:String, default:null},
    subtotal: {
        type:Number ,
        required:true,
    },

    grandtotal: {
        type:Number ,
        required:true,
    },

    customerusers: [customeruserSchema],
    payment_data:{
        payment_type: {type:String, default:null},
        nominal: {type:Number, default:null},
        change:{type: Number, default:null}
    },
    datetime_data: {
        time_in:{type:Date, default: new Date()},
        time_out:{type:Date,default: null }
    },

    status: {type: String, default:'Open'},

    table: {type:String},

    ticketNumber: {type:Number, required:true}

}, {timestamps: true});

