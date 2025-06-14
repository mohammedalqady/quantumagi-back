// const mongoose = require("mongoose");
// import app from "./app"
// require("dotenv").config();


// const connectDB = async () => {
//   try {
//     await mongoose.set("strictQuery", false);
//     mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error("MongoDB Connected", err.message);
//     process.exit();
//   }
// };

// connectDB();


// const PORT = process.env.PORT || 3300;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));