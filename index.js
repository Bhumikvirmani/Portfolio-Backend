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


const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://bhumikvirmani-portfolio.onrender.com",
      "http://localhost:8080"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handles preflight requests

app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));
const contactRoutes = require("./routes/contactRoute");
app.use("/api/contact", contactRoutes);
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

