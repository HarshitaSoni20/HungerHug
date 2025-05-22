import express from 'express';
import FoodBooking from '../models/FoodBooking.js'; // Import the FoodBooking model
const router = express.Router();

// Route to create a booking
router.post('/book', async (req, res) => {
  try {
    const { userId, bookingType, startDate, selectedDays, customizations } = req.body;

    // Create new booking
    const newBooking = new FoodBooking({
      userId, 
      bookingType, 
      startDate, 
      selectedDays, 
      customizations,
      status: 'pending', // default status
    });

    // Save the booking
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings for a user
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await FoodBooking.find({ userId: req.params.userId });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
