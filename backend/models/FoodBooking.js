import mongoose from 'mongoose';

const foodBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model to reference
    required: true,
  },
  bookingType: {
    type: String,
    enum: ['daywise', 'monthly'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  selectedDays: {
    type: [String], // Days the user wants to receive tiffins
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    validate: [arrayLimit, 'Selected days must be between 1 to 6 days'],
  },
  customizations: {
    rotiCount: {
      type: Number,
      default: 2, // You can change default as per your choice
      min: 1,
    },
    rice: {
      type: Boolean,
      default: true,
    },
    salad: {
      type: Boolean,
      default: false,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending',
  },
});

function arrayLimit(val) {
  return val.length >= 1 && val.length <= 6; // Ensure that the user selects 1-7 days
}

const FoodBooking = mongoose.model('FoodBooking', foodBookingSchema);

export default FoodBooking;
