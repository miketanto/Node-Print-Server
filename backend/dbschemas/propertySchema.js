import mongoose from 'mongoose';

export const propertySchema = mongoose.Schema({
    property_type:{type:String,required:true},

    properties: [
        {property: {
                    type: String,
                    required: true
                    },
        availability: {
                    type: Boolean,
                    default: true
                    }  
        }]
});
