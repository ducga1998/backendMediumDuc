
import mongoose from 'mongoose';
export const communitySchema = new mongoose.Schema({

}, {
        timestamps: true
})
communitySchema.set('toObject', { virtuals: true });
communitySchema.set('toJSON', { virtuals: true });
const communityModel = mongoose.model('community', communitySchema)
function getAllCommunity  () {
        return 
}

//function handle work reply commen





