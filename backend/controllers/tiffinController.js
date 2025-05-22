import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Provider Signup Controller
export const providerSignup = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  try {
    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingProvider = await User.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: 'Provider already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newProvider = new User({
      name,
      email,
      password: hashedPassword,
      role: 'provider',
      address,
      phone,
    });

    await newProvider.save();

    const token = jwt.sign({ id: newProvider._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      success: true,
      message: 'Provider registered successfully!',
      token,
      provider: {
        id: newProvider._id,
        name: newProvider.name,
        email: newProvider.email,
        role: newProvider.role,
      },
    });
  } catch (error) {
    console.error('Error during provider signup:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// You can export other tiffin-related controllers below as well
export const createTiffin = async (req, res) => {
  // Dummy code – update according to your logic
  res.status(200).json({ message: "Tiffin created!" });
};
// Provider Login Controller
export const providerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const provider = await User.findOne({ email, role: 'provider' });
    if (!provider) {
      return res.status(400).json({ message: 'No provider found with this email.' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        role: provider.role,
      },
    });
  } catch (error) {
    console.error('Error during provider login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
