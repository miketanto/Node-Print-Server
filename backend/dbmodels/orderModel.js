import mongoose from 'mongoose';
import {orderSchema} from '../dbschemas/orderSchema.js';

const OrderCart =mongoose.model('OrderCart', orderSchema);

export default OrderCart;