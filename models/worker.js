import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const workerSchema = new Schema({
  ID: Number,
  name: String,
  age: Number,
  role: String,
  experience: Number,
  started: {
    type: Date,
    default: Date.now
  },
  school: String,
});

const Worker = model('Worker', workerSchema);
export default Worker;
