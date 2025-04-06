import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  cuisine: { 
    type: String, 
    enum: ['italian', 'indian', 'japanese', 'mexican', 'american'],
    required: true 
  },
  dietaryRestrictions: [{
    type: String,
    enum: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'none']
  }]
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  timeSlots: [timeSlotSchema],
  dishes: [dishSchema]
});

export default mongoose.model('Restaurant', restaurantSchema);