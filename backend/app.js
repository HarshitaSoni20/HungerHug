// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from '../Components/Card';  // Assuming Card component is already created
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';

// export default function Home() {
//   const [foodItems, setFoodItems] = useState([]); // Food Items
//   const [foodCat, setFoodCat] = useState([]); // Food Categories
//   const [loading, setLoading] = useState(true); // Loading state
//   const [search, setSearch] = useState(''); // Search state

//   const loadFoodItems = async () => {
//     try {
//       // Fetch food data from backend
//       const response = await axios.get('http://localhost:5000/api/foodData');
//       setFoodItems(response.data.foodItems);  // Set food items
//       setFoodCat(response.data.foodCategories);  // Set food categories
//     } catch (error) {
//       console.error('Error loading food data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadFoodItems();  // Load data when component mounts
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         {/* Search Input */}
//         <div className="d-flex justify-content-center mt-3">
//           <input
//             className="form-control me-2 w-75 bg-white text-dark"
//             type="search"
//             placeholder="Search for food..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           foodCat.length > 0 && foodItems.length > 0 ? (
//             foodCat.map((category) => (
//               <div key={category._id} className="row mb-3">
//                 <div className="fs-3 m-3">{category.CategoryName}</div>
//                 <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
//                 <div className="row">
//                   {foodItems
//                     .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
//                     .map(filteredItem => (
//                       <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
//                         <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>No Data Found</div>
//           )
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/dbConnection.js';
import userRoutes from './routes/userRoutes.js';
import tiffinRoutes from './routes/tiffinRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnection();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tiffins', tiffinRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Tiffin Service API');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
