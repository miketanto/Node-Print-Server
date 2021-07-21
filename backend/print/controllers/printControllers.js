import mongoose from 'mongoose';
import OrderCart from '../../dbmodels/orderModel.js';
import {printKitchen, printBill,printFinalBill,printSplitBill,printVoid, printBar, printChecker} from '../controllers/printJobs.js';
import dateformat from 'dateformat'
import fs from 'fs';

export const printAll_C = (req,res)=>{
    const order_id = req.body.order_id;
    OrderCart.findById(order_id)
    .then((cart)=>{
        printKitchen(cart);
       // printBar(cart);
       //printChecker(cart);
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
export const saveTaxFile= async (req,res)=>{
   
    let currentDate = new Date()
    currentDate.setHours(0,0,0,0);
    const tomorrow = new Date(currentDate)
    tomorrow.setDate(tomorrow.getDate() + 1);

    const queryOrder = {
         createdAt: { $gte: currentDate , $lte:tomorrow } 
    }
    try {
        let ordersByDate = await OrderCart.find(queryOrder);
        currentDate = dateformat(currentDate,"isoDate")
        currentDate = currentDate.toString()
        currentDate = currentDate.replace('-','');
        var stream = fs.createWriteStream(`./TaxData/RNOPD_${currentDate}000000.txt`);
        stream.once('open', function(fd) {
            ordersByDate.forEach(function (orders) {
                //MM/dd/yyyy HH:mm:ss|Ticket_no|Amount|ServiceCharge|Receipt_No
                stream.write(`${dateformat(orders.datetime_data.time_out, "mm/dd/yyyy HH:mm:ss")
            }|${orders.ticketNumber}|${parseFloat(orders.grandtotal).toFixed(2)}|${parseFloat(Number(orders.subtotal)*0.05).toFixed(2)}|${orders.ticketNumber}\n`);
            })
            stream.end();
        });
    } catch (error) {
        console.log(error)
    }
   
    
}
const ObjectId = mongoose.Types.ObjectId;
