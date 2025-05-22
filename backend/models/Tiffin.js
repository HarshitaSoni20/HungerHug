import mongoose from 'mongoose';

// Validator function for price
function validatePrice(value) {
  return value >= 0;
}

// Validator function for location
function validateLocation(value) {
  return value.city && value.area && value.pinCode;
}

// Validator function for image URLs
function validateImageUrls(value) {
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
  return value.every(url => urlRegex.test(url));
}

// Validator function for image array length
function validateImageArrayLength(value) {
  return value.length <= 3;
}

const TiffinSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tiffinName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '', // Default to empty string if not provided
  },
  price: {
    type: Number,
    validate: [validatePrice, 'Price must be a non-negative number'],
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    validate: [validateLocation, 'Invalid location details'], // Apply the location validation
  },
  foodImages: {
    type: [String], // Array of image URLs
    validate: [
      { validator: validateImageArrayLength, message: 'Max 3 images allowed' },
      { validator: validateImageUrls, message: 'Invalid image URLs' },
    ],
  },
}, { timestamps: true });

const Tiffin = mongoose.model('Tiffin', TiffinSchema);
export default Tiffin;
