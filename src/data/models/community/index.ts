
import mongoose from 'mongoose';
import uuid from 'uuid'
export const communitySchema = new mongoose.Schema({

}, {
        timestamps: true
})
communitySchema.set('toObject', { virtuals: true });
communitySchema.set('toJSON', { virtuals: true });
const communityModel = mongoose.model('community', communitySchema)

//function handle work reply commen





