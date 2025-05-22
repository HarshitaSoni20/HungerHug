import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyProvider = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "provider") {
      return res.status(403).json({ message: "Access Denied: Not a provider" });
    }

    req.user = user;  // Attaching the full user object to the request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ message: "Invalid Token" });
  }
};
