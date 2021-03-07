import mongoose from 'mongoose';
import {customeruserSchema} from '../dbschemas/customeruserSchema.js';

const CustomerUser =mongoose.model('CustomerUser', customeruserSchema);

export default CustomerUser