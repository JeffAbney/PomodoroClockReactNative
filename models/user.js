import mongoose, { Schema } from 'mongoose';

// Define movie schema
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  log: Array,
});

// Export Mongoose model
export default mongoose.model('User', userSchema);