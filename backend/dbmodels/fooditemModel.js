import mongoose from 'mongoose';
import {fooditemSchema} from '../dbschemas/fooditemSchema.js';

const FoodItem =mongoose.model('FoodItem', fooditemSchema);

export default FoodItem