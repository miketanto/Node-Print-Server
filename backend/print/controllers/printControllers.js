import mongoose from 'mongoose';
import OrderCart from '../../dbmodels/orderModel.js';
import {printKitchen, printBill,printFinalBill,printSplitBill,printVoid, printBar, printChecker} from '../controllers/printJobs.js';

export const printAll_C = (req,res)=>{
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printKitchen(cart);
        printBar(cart);
        printChecker(cart);
    })
    res.status(200).json('Done')
}

export const printBill_C = (req,res)=>{
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printBill(cart);
        res.status(200);
    })
}

export const printFinalBill_C = (req,res)=>{
    const payment_data = req.body.payment_data;
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printFinalBill(cart,payment_data);
        res.status(200);
    })
}

export const printSplitBill_C = (req,res)=>{
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printSplitBill(cart);
        res.status(200);
    })
}

export const printVoid_C = (req,res)=>{
    const fooditem_id = req.body.fooditem_id;
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printVoid(cart,fooditem_id);
        res.status(200);
    })
}

export const printKitchen_C = (req,res)=>{
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printKitchen(cart);
        res.status(200);
    })
}
const ObjectId = mongoose.Types.ObjectId;