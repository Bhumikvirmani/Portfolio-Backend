const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const app = express();
// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   "http://localhost:8080"               // local frontend
// ];
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: [
    "https://bhumikvirmani-portfolio.onrender.com",
    "http://localhost:8080"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.options("*", cors());

app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));
const contactRoutes = require("./routes/contactRoute");
app.use("/api/contact", contactRoutes);
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

