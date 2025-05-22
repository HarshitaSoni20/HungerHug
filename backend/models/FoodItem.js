// In your FoodItem model (models/FoodItem.js)
import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: String,
  img: String,
  options: Array,
  description: String,
  CategoryName: String
});

export default mongoose.models.FoodItem || mongoose.model('FoodItem', foodItemSchema);

