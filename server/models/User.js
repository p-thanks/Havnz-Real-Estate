import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,
  bookedVisits: [{ type: Object }],
  favResidenciesID: [String],
}, { timestamps: true });

export default mongoose.model('User', userSchema);