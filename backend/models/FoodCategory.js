// In your FoodItem model (models/FoodItem.js)
import mongoose from 'mongoose';

const foodCategorySchema = new mongoose.Schema({
  CategoryName: String
});

export default mongoose.models.FoodCategory || mongoose.model('FoodCategory', foodCategorySchema);

