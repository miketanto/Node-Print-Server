import mongoose from 'mongoose';
import {orderItemSchema} from '../dbschemas/orderItemSchema.js';

const OrderItem =mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;