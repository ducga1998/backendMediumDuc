import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    connections: { type: [{ idUser: String, socketid: String }] }
})
const roomModel = mongoose.model('room', roomSchema)
