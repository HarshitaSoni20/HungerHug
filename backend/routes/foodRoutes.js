import express from 'express';
import FoodItem from '../models/FoodItem.js';  // FoodItem model import
import FoodCategory from '../models/FoodCategory.js';  // FoodCategory model import

const router = express.Router();

// Route to fetch food items
router.get('/foodData', async (req, res) => {
  try {
    // Fetch food items and categories from DB
    const foodItems = await FoodItem.find();  // Fetch all food items
    const foodCategories = await FoodCategory.find();  // Fetch all categories

    // Send data as response
    res.json({
      foodItems,
      foodCategories,
    });
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;


